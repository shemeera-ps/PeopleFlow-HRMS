<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\DesignationService;
use App\Http\Requests\designation\StoreDesignationRequest;
use App\Http\Requests\designation\UpdateDesignationRequest;
class DesignationController extends Controller
{
    public function __construct(protected DesignationService $designationService)
    {
    }
    public function index(Request $request)
    {
        return $this->designationService->all($request);
    }
    public function store(StoreDesignationRequest $request)
    {

        return $this->designationService->create($request->validated());
    }
    public function update(UpdateDesignationRequest $request, $id)
    {
        return $this->designationService->update($id, $request->validated());
    }
    public function destroy($id)
    {
        return $this->designationService->destroy($id);
    }
    public function show($id)
    {
        return $this->designationService->show($id);
    }
    public function designationsUnderDepartment($departmentId)
    {
        return $this->designationService->getDesignationsByDepartment($departmentId);
    }
    public function getUsers($designationId)
    {
        return $this->designationService->getUsers($designationId);
    }
}
