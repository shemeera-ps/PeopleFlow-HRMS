<?php
namespace App\Services;
use App\Models\Branch;

use App\Constants\Messages;
use App\Helpers\ApiResponse;
use App\Http\Resources\BranchResource;

class BranchService
{
    public function all($request)
    {
        $perPage = $request->per_page ?? 10;
        $sortBy = $request->sort_by ?? "name";
        $sortOrder = $request->sort_order ?? "asc";
        $search = $request->search ?? "";

        $data = Branch::where('is_active', true)
            ->where(function ($query) use ($search) {
                $query->where('name', 'like', "%$search%")
                    ->orWhere('address', 'like', "%$search%")
                    ->orWhere('city', 'like', "%$search%")
                    ->orWhere('state', 'like', "%$search%")
                    ->orWhere('country', 'like', "%$search%");
            })
            ->orderBy($sortBy, $sortOrder)
            ->paginate($perPage);
        return ApiResponse::success(Messages::LISTED, $data);
    }

    public function create(array $data)
    {
        $branch = Branch::create($data + ["created_by" => auth('api')->user()->id]);
        return ApiResponse::success(Messages::CREATED, new BranchResource($branch));
    }
    public function update(int $id, array $data)
    {
        $branch = Branch::find($id);
        if (!$branch) {
            return ApiResponse::error(Messages::NOT_FOUND, null, 404);
        }
        $branch->update($data + ['updated_by' => auth('api')->user()->id]);
        return ApiResponse::success(Messages::UPDATED, new BranchResource($branch));
    }
    public function destroy(int $id)
    {
        $branch = Branch::find($id);
        if (!$branch) {
            return ApiResponse::error(Messages::NOT_FOUND, null, 404);
        }
        $branch->delete();
        return ApiResponse::success(Messages::DELETED, null);
    }
    public function show(int $id)
    {
        $branch = Branch::find($id);
        if (!$branch) {
            return ApiResponse::error(Messages::NOT_FOUND, null, 404);
        }
        return ApiResponse::success(Messages::FETCHED, new BranchResource($branch));
    }


}