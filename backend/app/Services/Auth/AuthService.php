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

    // private function buildResponse(...)
    // {

    // }
}