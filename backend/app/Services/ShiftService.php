<?php
namespace App\Services;

use App\Constants\Messages;
use App\Helpers\ApiResponse;
use App\Models\Shift;
use App\Http\Resources\ShiftResource;

class ShiftService
{
    public function all()
    {
        $data = Shift::where('is_active', true)->get();
        return ApiResponse::success(Messages::LISTED, $data);
    }

    public function create(array $data)
    {
        $shift = Shift::create($data);
        return ApiResponse::success(Messages::CREATED, new ShiftResource($shift));
    }

    public function update(array $data, int $id)
    {
        $shift = Shift::find($id);
        if (!$shift) {
            return ApiResponse::error(Messages::NOT_FOUND, null, 404);
        }
        $shift->update($data);
        return ApiResponse::success(Messages::UPDATED, new ShiftResource($shift));
    }
    public function destroy(int $id)
    {
        $shift = Shift::find($id);
        if (!$shift) {
            return ApiResponse::error(Messages::NOT_FOUND, null, 404);
        }
        $shift->delete();
        return ApiResponse::success(Messages::DELETED, null);
    }
    public function show(int $id)
    {
        $shift = Shift::find($id);
        if (!$shift) {
            return ApiResponse::error(Messages::NOT_FOUND, null, 404);
        }
        return ApiResponse::success(Messages::FETCHED, new ShiftResource($shift));
    }
}
