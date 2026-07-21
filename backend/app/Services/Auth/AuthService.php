<?php
namespace App\Services\Auth;
use App\Constants\Messages;
use App\Helpers\ApiResponse;
use App\Http\Resources\UserResource;
use App\Models\RefreshToken;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Illuminate\Http\Request;
class AuthService
{
    public function login(array $credentials, Request $request)
    {
        Log::info('credentials', ['credentials' => $credentials]);
        Log::info('request', ['request' => $request]);
        $user = $this->findUser($credentials['username']);
        Log::info('user', ['user' => $user]);
        if (!$user) {
            return ApiResponse::error(Messages::INVALID_CREDENTIALS, null, 401);
        }

        if (!$this->verifyPassword($user, $credentials['password'])) {
            return ApiResponse::error(Messages::INVALID_CREDENTIALS, null, 401);
        }

        $token = JWTAuth::fromUser($user);
        RefreshToken::where('user_id', $user->id)
            ->where(function ($query) {
                $query->where('revoked', true)
                    ->orWhere('expires_at', '<', now());
            })
            ->delete();

        $refreshToken = Str::random(64);
        RefreshToken::create([
            'user_id' => $user->id,
            'token_hash' => hash('sha256', $refreshToken),
            'ip_address' => $request->ip(),
            'user_agent' => request()->userAgent(),
            'expires_at' => now()->addDays(30),
            'last_used_at' => now()
        ]);
        $user->update(['last_login_at' => now()]);

        return ApiResponse::success(
            Messages::LOGIN_SUCCESS,
            [
                'user' => new UserResource($user),
                'roles' => $user->getRoles(),
                'permissions' => $user->getPermissions(),
                'token' => $token,
            ]
        )->cookie(
                'refresh_token',
                $refreshToken,
                60 * 24 * 30,   // 30 days
                '/',
                null,
                app()->environment('production'),
                true,           // HttpOnly
                false,
                'Strict'
            );

    }

    private function findUser(string $username)
    {
        return User::where('email', $username)
            ->orWhere('employee_code', $username)->first();
    }

    private function verifyPassword(User $user, string $password)
    {
        return Hash::check($password, $user->password);
    }

    private function generateToken(User $user)
    {

    }

    public function logout($request = null)
    {
        $token = $this->resolveToken($request);
        if ($token) {
            JWTAuth::setToken($token);
        }
        JWTAuth::invalidate(JWTAuth::getToken());
        $refreshToken = $request->cookie('refresh_token');

        if ($refreshToken) {
            $tokenHash = hash('sha256', $refreshToken);

            RefreshToken::where('token_hash', $tokenHash)
                ->update([
                    'revoked' => true,
                ]);
        }
        return ApiResponse::success(Messages::LOGOUT_SUCCESS);
    }
    public function refreshToken(Request $request)
    {
        $refreshToken = $request->cookie('refresh_token');

        if (!$refreshToken) {
            Log::error('Refresh token not found');
            return ApiResponse::error(
                'Unauthenticated.',
                null,
                401
            );
        }
        $tokenHash = hash('sha256', $refreshToken);
        $storedToken = RefreshToken::where(
            'token_hash',
            $tokenHash
        )->first();
        if (!$storedToken) {
            Log::error('Invalid refresh token');
            return ApiResponse::error(
                'Unauthenticated.',
                null,
                401
            );
        }
        if ($storedToken->revoked) {
            Log::error('Refresh token has been revoked.');
            return ApiResponse::error(
                'Unauthenticated.',
                null,
                401
            );
        }
        if ($storedToken->expires_at->isPast()) {
            Log::error('Refresh token has been revoked.');
            return ApiResponse::error(
                'Unauthenticated.',
                null,
                401
            );
        }
        $user = $storedToken->user;

        if (!$user) {
            return ApiResponse::error(
                'User not found.',
                null,
                401
            );
        }
        $accessToken = JWTAuth::fromUser($user);
        $newRefreshToken = Str::random(64);
        $storedToken->update([
            'token_hash' => hash('sha256', $newRefreshToken),
            'expires_at' => now()->addDays(30),
            'last_used_at' => now(),
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);
        return ApiResponse::success(
            'Token refreshed successfully.',
            [
                'token' => $accessToken,
            ]
        )->cookie(
                'refresh_token',
                $newRefreshToken,
                60 * 24 * 30,
                '/',
                null,
                app()->environment('production'),
                true,
                false,
                'Strict'
            );
    }

    public function changePassword(array $data, $request = null)
    {
        $token = $this->resolveToken($request);
        if ($token) {
            JWTAuth::setToken($token);
        }

        $user = auth('api')->user();

        if (!Hash::check($data['current_password'], $user->password)) {
            return ApiResponse::error('Current password is incorrect.', null, 400);
        }
        if (Hash::check($data['new_password'], $user->password)) {
            return ApiResponse::error('New password cannot be the same as the current password.', null, 400);
        }
        $user->update([
            'password' => Hash::make($data['new_password']),
        ]);
        JWTAuth::invalidate(JWTAuth::getToken());
        return ApiResponse::success('Password changed successfully.');
    }

    private function resolveToken($request): ?string
    {
        if (!$request) {
            return null;
        }

        $authorizationHeader = $request->header('Authorization');

        if (is_string($authorizationHeader) && str_starts_with(strtolower($authorizationHeader), 'bearer ')) {
            return trim(substr($authorizationHeader, 7));
        }

        if (is_string($authorizationHeader) && $authorizationHeader !== '') {
            return trim($authorizationHeader);
        }

        foreach (['token', 'access_token', 'bearer_token'] as $key) {
            $value = $request->query($key, $request->input($key));

            if (is_string($value) && $value !== '') {
                return trim($value);
            }
        }

        $xAccessToken = $request->header('X-Access-Token');

        if (is_string($xAccessToken) && $xAccessToken !== '') {
            return trim($xAccessToken);
        }

        return null;
    }
}