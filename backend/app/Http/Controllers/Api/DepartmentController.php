<?php

namespace App\Http\Controllers\Api;

use App\Services\DepartmentService;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\department\StoreDepartmentRequest;
use App\Http\Requests\department\UpdateDepartmentRequest;

class DepartmentController extends Controller
{
    public function __construct(protected DepartmentService $departmentService)
    {
    }

    public function index(Request $request)
    {
        return $this->departmentService->all($request);
    }

    public function store(StoreDepartmentRequest $request)
    {
        return $this->departmentService->create($request->validated());
    }

    public function update(UpdateDepartmentRequest $request, $id)
    {
        return $this->departmentService->update($id, $request->validated());
    }

    public function destroy($id)
    {
        return $this->departmentService->destroy($id);
    }
    public function show($id)
    {
        return $this->departmentService->show($id);
    }


}
