<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Auth\PermissionService;
use App\Http\Requests\permissions\CreatePermissionRequest;
use App\Http\Requests\permissions\UpdatePermissionRequest;
class PermissionController extends Controller
{
    public function __construct(protected PermissionService $permissionService)
    {

    }
    public function index()
    {
        return $this->permissionService->getAllPermissions();
    }
    public function store(CreatePermissionRequest $request)
    {
        return $this->permissionService->createPermission($request->validated());

    }
    public function update(UpdatePermissionRequest $request, $id)
    {
        return $this->permissionService->updatePermission($request->validated(), $id);
    }
    public function destroy($id)
    {
        return $this->permissionService->deletePermission($id);
    }

    public function getPermission($id)
    {
        return $this->permissionService->getPermission($id);
    }
}
