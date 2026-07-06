<?php

use App\Http\Controllers\Api\ShiftApiController;
use App\Http\Controllers\Auth\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\PermissionController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\DepartmentController;
use App\Http\Controllers\Api\DesignationController;
use App\Http\Controllers\Api\EmploymentTypeController;
use App\Http\Controllers\Api\BranchController;
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
        Route::delete('/delete/{id}', [RoleController::class, 'destroy']);
        Route::post('/{id}/assign-permissions', [RoleController::class, 'assignPermissions']);
        Route::get('/{id}/permissions', [RoleController::class, 'getPermissions']);
        Route::get('{id}/role', [RoleController::class, 'getRole']);
    });

    Route::prefix('permissions')->group(function () {
        Route::get('all', [PermissionController::class, 'index']);
        Route::post('store', [PermissionController::class, 'store']);
        Route::put('/{id}/update', [PermissionController::class, 'update']);
        Route::delete('/delete/{id}', [PermissionController::class, 'destroy']);
        Route::get('/{id}/permission', [PermissionController::class, 'getPermission']);
    });

    Route::prefix('users')->group(function () {
        Route::get('/all', [UserController::class, 'index']);
        Route::post('/store', [UserController::class, 'store']);
        Route::put('/{id}/update', [UserController::class, 'update']);
        Route::delete('/delete/{id}', [UserController::class, 'destroy']);
        Route::get('/users/{id}', [UserController::class, 'show']);
        Route::post('/assign-roles', [UserController::class, 'assignRoles']);
        Route::get('getroles/{id}', [UserController::class, 'getAssignedRoles']);
        Route::post('removeroles', [UserController::class, 'removeRoles']);

        Route::put('/{id}/organization', [UserController::class, 'updateOrganizationDetails']);

        Route::put("/{id}/profile", [UserController::class, 'updateProfile']);
    });

    Route::prefix('departments')->group(function () {
        Route::get('/all', [DepartmentController::class, 'index']);
        Route::post('/store', [DepartmentController::class, 'store']);
        Route::put('/{id}/update', [DepartmentController::class, 'update']);
        Route::delete('delete/{id}', [DepartmentController::class, 'destroy']);
        Route::get('/getdepartment/{id}', [DepartmentController::class, 'show']);

    });

    Route::prefix('designations')->group(function () {
        Route::get('/all', [DesignationController::class, 'index']);
        Route::post('/store', [DesignationController::class, 'store']);
        Route::put('/{id}/update', [DesignationController::class, 'update']);
        Route::delete('delete/{id}', [DesignationController::class, 'destroy']);
        Route::get('/getdesignation/{id}', [DesignationController::class, 'show']);
        Route::get('/departments/{id}', [DesignationController::class, 'designationsUnderDepartment']);

    });

    Route::prefix('employmenttype')->group(function () {
        Route::get('/all', [EmploymentTypeController::class, 'index']);
        Route::post('/store', [EmploymentTypeController::class, 'store']);
        Route::put('/{id}/update', [EmploymentTypeController::class, 'update']);
        Route::delete('delete/{id}', [EmploymentTypeController::class, 'destroy']);
    });

    Route::prefix('branches')->group(function () {
        Route::get('/all', [BranchController::class, 'index']);
        Route::post('/store', [BranchController::class, 'store']);
        Route::put('/{id}/update', [BranchController::class, 'update']);
        Route::delete('delete/{id}', [BranchController::class, 'destroy']);
        Route::get('/{id}', [BranchController::class, 'show']);

    });

    Route::prefix('shifts')->group(function () {
        Route::get('/all', [ShiftApiController::class, 'index']);
        Route::post('/store', [ShiftApiController::class, 'store']);
        Route::put('/{id}/update', [ShiftApiController::class, 'update']);
        Route::delete('delete/{id}', [ShiftApiController::class, 'destroy']);
        Route::get('/{id}', [ShiftApiController::class, 'show']);
    });



});