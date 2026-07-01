<?php
namespace App\Services\Auth;
use App\Models\Permission;
use App\Constants\Messages;
use App\Helpers\ApiResponse;
class PermissionService
{
    public function getAllPermissions($request)
    {
        $per_page = $request->per_page ?? 10;
        $permissions = Permission::where('is_active', true);

        if ($request->has('search')) {
            $permissions = $permissions->where('name', 'like', '%' . $request->search . '%')
                ->orWhere('description', 'like', '%' . $request->search . '%');
        }

        $permissions = $permissions->orderBy('name', 'asc')->paginate($per_page);
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