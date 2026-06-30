<?php

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\PermissionController;
Route::prefix('v1/auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login'])->name('login');
});




Route::middleware('auth:api')->prefix('v1')->group(function () {

    Route::prefix('auth')->group(function () {
        Route::get('/me', [AuthController::class, 'me']);

        Route::post('/logout', [AuthController::class, 'logout']);
        Route::post('/change-password', [AuthController::class, 'changePassword']);
        Route::post('/refresh', [AuthController::class, 'refreshToken']);
    });

    Route::prefix('roles')->group(function () {
        Route::get('all', [RoleController::class, 'index']);
        Route::post('store', [RoleController::class, 'store']);
        Route::put('/{id}/update', [RoleController::class, 'update']);
        Route::delete('/{id}/delete', [RoleController::class, 'destroy']);
        Route::post('/{id}/assign-permissions', [RoleController::class, 'assignPermissions']);
        Route::get('/{id}/permissions', [RoleController::class, 'getPermissions']);
        Route::get('{id}/role', [RoleController::class, 'getRole']);
    });

    Route::prefix('permissions')->group(function () {
        Route::get('all', [PermissionController::class, 'index']);
        Route::post('store', [PermissionController::class, 'store']);
        Route::put('/{id}/update', [PermissionController::class, 'update']);
        Route::delete('/{id}/delete', [PermissionController::class, 'destroy']);
        Route::get('{id}/permission', [PermissionController::class, 'getPermission']);
    });


});