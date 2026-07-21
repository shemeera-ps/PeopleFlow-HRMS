<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Helpers\ApiResponse;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\Auth\ChangePasswordRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Services\Auth\AuthService;

class AuthController extends Controller
{
    public function __construct(protected AuthService $authService)
    {
    }

    public function login(LoginRequest $request)
    {
        return $this->authService->login($request->validated(), $request);
    }

    public function logout(Request $request)
    {
        // dd($this->authenticateRequest($request));
        if (!$this->authenticateRequest($request)) {
            return ApiResponse::error('Unauthenticated.', null, 401);
        }

        return $this->authService->logout($request);
    }

    public function changePassword(Request $request, ChangePasswordRequest $changePasswordRequest)
    {
        if (!$this->authenticateRequest($request)) {
            return ApiResponse::error('Unauthenticated.', null, 401);
        }

        return $this->authService->changePassword($changePasswordRequest->validated(), $request);
    }

    public function refreshToken(Request $request)
    {
        if (!$this->authenticateRequest($request)) {
            return ApiResponse::error('Unauthenticated.', null, 401);
        }

        return $this->authService->refreshToken($request);
    }

    public function me(Request $request)
    {
        if (!$this->authenticateRequest($request)) {
            return ApiResponse::error('Unauthenticated.', null, 401);
        }

        return ApiResponse::success('User fetched successfully.', auth('api')->user());
    }

    private function authenticateRequest(Request $request): bool
    {
        $token = $this->resolveToken($request);

        if (blank($token)) {
            return false;
        }

        $guard = auth('api');
        $guard->setToken($token);

        return $guard->check();
    }

    private function resolveToken(Request $request): ?string
    {
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
