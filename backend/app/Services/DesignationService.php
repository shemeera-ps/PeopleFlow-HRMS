<?php
namespace App\Services;

use App\Constants\Messages;
use App\Helpers\ApiResponse;
use App\Http\Resources\DesignationResource;
use App\Models\Designation;

class DesignationService
{

    public function all($request)
    {
        $sortBy = $request->input("sort_by") ?? 'name';
        $sortOrder = $request->input('sort_order') ?? 'asc';
        $search = $request->input('search') ?? '';
        $perPage = $request->input('per_page') ?? 10;

        $data = Designation::where('is_active', true)
            ->where(function ($query) use ($search) {
                $query->where('name', 'like', "%$search%")
                    ->orWhere('code', 'like', "%$search%")
                    ->orWhere('description', 'like', "%$search%");
            })
            ->orderBy($sortBy, $sortOrder)
            ->paginate($perPage);
        return ApiResponse::success('Designations fetched successfully', $data);
    }
    public function create(array $data)
    {
        $designation = Designation::create($data);
        return ApiResponse::success('Designation created successfully', new DesignationResource($designation));
    }
    public function update($id, array $data)
    {
        $designation = Designation::find($id);
        if (!$designation) {
            return ApiResponse::error(Messages::NOT_FOUND, null, 404);
        }
        $designation->update($data);
        return ApiResponse::success('Designation updated successfully', new DesignationResource($designation));
    }
    public function destroy($id)
    {
        $designation = Designation::find($id);
        if (!$designation) {
            return ApiResponse::error(Messages::NOT_FOUND, null, 404);
        }
        $designation->delete();
        return ApiResponse::success('Designation deleted successfully');
    }
    public function show($id)
    {
        $designation = Designation::find($id);
        if (!$designation) {
            return ApiResponse::error(Messages::NOT_FOUND, null, 404);
        }
        return ApiResponse::success('Designation fetched successfully', new DesignationResource($designation));
    }
    public function getDesignationsByDepartment($departmentId)
    {
        $designations = Designation::where('department_id', $departmentId)->where('is_active', true)->get();
        return ApiResponse::success(Messages::LISTED, $designations);
    }
}