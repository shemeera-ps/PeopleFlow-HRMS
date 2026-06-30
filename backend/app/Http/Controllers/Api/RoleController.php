<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\roles\CreateRoleRequest;
use App\Http\Requests\roles\UpdateRoleRequest;
use App\Services\Auth\RoleService;

class RoleController extends Controller
{
    public function __construct(protected RoleService $roleService)
    {

    }
    public function index()
    {
        return $this->roleService->all();
    }

    public function store(CreateRoleRequest $request)
    {
        return $this->roleService->createRole($request->validated());
    }

    public function update(UpdateRoleRequest $request, $id)
    {
        return $this->roleService->updateRole($request->validated(), $id);
    }

    public function destroy($id)
    {
        return $this->roleService->deleteRole($id);
    }

    public function assignPermissions(Request $request, $id)
    {
        $data = $request->validate([
            'permissions' => 'required|array',
            'permissions.*' => 'integer|exists:permissions,id',
        ]);

        return $this->roleService->assignPermissions($data, $id);
    }

    public function getPermissions($id)
    {
        return $this->roleService->getPermissions($id);
    }

    public function getRole($id)
    {
        return $this->roleService->getRole($id);
    }
}
