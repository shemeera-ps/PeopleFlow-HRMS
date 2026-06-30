<?php
namespace App\Services\Auth;
use App\Models\Permission;
use App\Constants\Messages;
use App\Helpers\ApiResponse;
class PermissionService
{
    public function getAllPermissions()
    {
        $permissions = Permission::where('is_active', true)->get();
        return ApiResponse::success($permissions);
    }

    public function createPermission(array $data)
    {
        $data = Permission::create($data + ['is_active' => true, 'created_by' => auth('api')->user()->id]);

        return ApiResponse::success('Permission record created successfully', $data);
    }

    public function updatePermission(array $data, $id)
    {
        $row = Permission::find($id);
        if (!$row) {
            return ApiResponse::error(Messages::NOT_FOUND, null, 404);
        }
        $row->update($data);
        return ApiResponse::success("Permission updated successfully.", $row);
    }

    public function deletePermission($id)
    {
        $data = Permission::find($id);
        if (!$data) {
            return ApiResponse::error(Messages::NOT_FOUND, null, 404);

        }
        $data->delete();
        return ApiResponse::success("Permission record deleted successfully", $data);
    }
    public function getPermission($id)
    {
        $data = Permission::find($id);
        if (!$data) {
            return ApiResponse::error(Messages::NOT_FOUND, null, 404);

        }
        return ApiResponse::success($data);

    }
}