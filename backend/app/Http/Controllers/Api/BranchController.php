<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\BranchService;
use App\Http\Requests\branches;
use App\Http\Requests\branches\UpdateBranchRequest;
use App\Http\Requests\branches\StoreBranchRequest;

class BranchController extends Controller
{
    public function __construct(protected BranchService $branchService)
    {
    }
    public function all()
    {
        return $this->branchService->all();
    }
    public function index(Request $request)
    {
        return $this->branchService->index($request);

    }
    public function store(StoreBranchRequest $request)
    {
        return $this->branchService->create($request->validated());

    }
    public function update(UpdateBranchRequest $request, $id)
    {
        return $this->branchService->update($id, $request->validated());
    }
    public function destroy($id)
    {
        return $this->branchService->destroy($id);
    }
    public function show($id)
    {
        return $this->branchService->show($id);
    }
}
