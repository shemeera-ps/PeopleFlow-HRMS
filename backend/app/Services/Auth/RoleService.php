<?php
namespace App\Services\Auth;
use App\Constants\Messages;
use App\Helpers\ApiResponse;
use App\Models\Role;
class RoleService
{

    public function __construct()
    {

    }

    public function all()
    {
        $data = Role::where('is_active', true)->get();
        return ApiResponse::success("Roles retrieved successfully.", $data);
    }

    public function createRole(array $data)
    {
        $roles = Role::create($data + ['is_active' => true, 'created_by' => auth('api')->user()->id]);
        return ApiResponse::success("Role created successfully.", $roles);
    }

    public function updateRole(array $data, $id)
    {
        $role = Role::find($id);
        if (!$role) {
            return ApiResponse::error(Messages::NOT_FOUND, null, 404);
        }
        $role->update($data);
        return ApiResponse::success("Role updated successfully.", $role);
    }

    public function deleteRole(int $id)
    {
        $role = Role::find($id);
        if (!$role) {
            return ApiResponse::error(Messages::NOT_FOUND, null, 404);
        }
        $role->delete();
        return ApiResponse::success("Role record deleted successfully", $role);
    }

    public function assignPermissions(array $data, $id)
    {
        $role = Role::find($id);
        if (!$role) {
            return ApiResponse::error(Messages::NOT_FOUND, null, 404);
        }
        $permissions = $data['permissions'] ?? [];
        $role->permissions()->sync($permissions);
        $role->load('permissions');
        return ApiResponse::success("Permissions assigned successfully.", $role->permissions);
    }

    public function getPermissions($id)
    {
        $role = Role::find($id);
        if (!$role) {
            return ApiResponse::error(Messages::NOT_FOUND, null, 404);
        }
        $role->load('permissions');
        return ApiResponse::success("Permissions retrieved successfully.", $role->permissions);
    }
    public function getRole($id)
    {
        $role = Role::find($id);
        if (!$role) {
            return ApiResponse::error(Messages::NOT_FOUND, null, 404);
        }
        return ApiResponse::success($role);
    }

}