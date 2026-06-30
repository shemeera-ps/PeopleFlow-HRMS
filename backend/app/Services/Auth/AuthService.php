<?php
namespace App\Services\Auth;
use App\Constants\Messages;
use App\Helpers\ApiResponse;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
class AuthService
{
    public function login(array $credentials)
    {
        $user = $this->findUser($credentials['username']);
        if (!$user) {
            return ApiResponse::error(Messages::INVALID_CREDENTIALS, null, 401);
        }

        if (!$this->verifyPassword($user, $credentials['password'])) {
            return ApiResponse::error(Messages::INVALID_CREDENTIALS, null, 401);
        }

        $token = JWTAuth::fromUser($user);
        $user->update(['last_login_at' => now()]);

        return ApiResponse::success(
            Messages::LOGIN_SUCCESS,
            [
                'user' => new UserResource($user),
                'roles' => $user->getRoles(),
                'permissions' => $user->getPermissions(),
                'token' => $token,
            ]
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
        return ApiResponse::success(Messages::LOGOUT_SUCCESS);
    }
    public function refreshToken($request = null)
    {
        $token = $this->resolveToken($request);
        if ($token) {
            JWTAuth::setToken($token);
        }
        $newToken = JWTAuth::refresh(JWTAuth::getToken());
        return ApiResponse::success(Messages::TOKEN_REFRESHED, ['token' => $newToken]);
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