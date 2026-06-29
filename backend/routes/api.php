<?php

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1/auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
});

Route::get('v1/me', function () {
    return response()->json(['message' => 'Authenticated user route']);
})->middleware('auth:api');