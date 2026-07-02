<?php
namespace App\Services;
use App\Http\Resources\DepartmentResource;
use App\Models\Department;
use App\Constants\Messages;
use App\Helpers\ApiResponse;
use App\Http\Resources\UserResource;

class DepartmentService
{
    public function all($request)
    {
        $perPage = $request->perPage ?? 10;
        $search = $request->search ?? '';
        $sortBy = $request->sortBy ?? 'name';
        $sortOrder = $request->sortOrder ?? 'asc';

        $data = Department::where('is_active', true)
            ->where(function ($query) use ($search) {
                $query->where('name', 'like', "%$search%")
                    ->orWhere('code', 'like', "%$search%")
                    ->orWhere('description', 'like', "%$search%");
            })
            ->orderBy($sortBy, $sortOrder)
            ->paginate($perPage);
        return ApiResponse::success('Departments fetched successfully', $data);
    }

    public function create(array $data)
    {
        $department = Department::create($data);
        return ApiResponse::success('Department created successfully', new DepartmentResource($department));
    }

    public function update(int $id, array $data)
    {
        $department = Department::find($id);
        if (!$department) {
            return ApiResponse::error(Messages::NOT_FOUND, null, 404);
        }
        $department->update($data);
        return ApiResponse::success('Department updated successfully', new DepartmentResource($department));
    }
    public function destroy(int $id)
    {
        $department = Department::find($id);
        if (!$department) {
            return ApiResponse::error(Messages::NOT_FOUND, null, 404);
        }
        $department->delete();
        return ApiResponse::success('Department deleted successfully', null);
    }
    public function show(int $id)
    {
        $department = Department::find($id);
        if (!$department) {
            return ApiResponse::error(Messages::NOT_FOUND, null, 404);
        }
        return ApiResponse::success('Department fetched successfully', new DepartmentResource($department));
    }

}