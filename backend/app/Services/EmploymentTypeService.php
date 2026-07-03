<?php
namespace App\Services;

use App\Constants\Messages;
use App\Helpers\ApiResponse;
use App\Http\Resources\EmploymentTypeResource;
use App\Models\EmploymentType;

class EmploymentTypeService
{
    public function all($request)
    {
        $data = EmploymentType::where('is_active', true)->get();
        return ApiResponse::success(Messages::LISTED, $data);
    }

    public function create(array $data)
    {
        $employmentType = EmploymentType::create($data);
        return ApiResponse::success(Messages::CREATED, new EmploymentTypeResource($employmentType));
    }

    public function update(array $data, $id)
    {
        $employmentType = EmploymentType::find($id);
        if (!$employmentType) {
            return ApiResponse::error(Messages::NOT_FOUND, null, 404);
        }
        $employmentType->update($data);
        return ApiResponse::success(Messages::UPDATED, new EmploymentTypeResource($employmentType));

    }
    public function destroy($id)
    {
        $employmentType = EmploymentType::find($id);
        if (!$employmentType) {
            return ApiResponse::error(Messages::NOT_FOUND, null, 404);
        }
        $employmentType->delete();
        return ApiResponse::success(Messages::DELETED);
    }
}