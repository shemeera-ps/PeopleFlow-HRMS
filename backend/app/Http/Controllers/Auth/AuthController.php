<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Helpers\ApiResponse;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\Auth\LoginRequest;
use App\Services\Auth\AuthService;

class AuthController extends Controller
{
    //

    public function __construct(protected AuthService $authService)
    {
        $this->middleware('auth:api')->except(['login']);
    }

    public function login(LoginRequest $request)
    {
        return $this->authService->login($request->validated());
    }
}
