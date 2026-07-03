<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\EmploymentTypeService;
use App\Http\Requests\employmenttype\StoreEmploymentTypeRequest;
use App\Http\Requests\employmenttype\UpdateEmploymentTypeRequest;

class EmploymentTypeController extends Controller
{
    public function __construct(protected EmploymentTypeService $employmentTypeService)
    {
    }
    public function index(Request $request)
    {
        return $this->employmentTypeService->all($request);
    }
    public function store(StoreEmploymentTypeRequest $request)
    {
        return $this->employmentTypeService->create($request->validated());

    }
    public function update(UpdateEmploymentTypeRequest $request, $id)
    {
        return $this->employmentTypeService->update($request->validated(), $id);
    }
    public function destroy($id)
    {
        return $this->employmentTypeService->destroy($id);
    }
}
