<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\ShiftService;
use App\Http\Requests\shifts\StoreShiftRequest;
use App\Http\Requests\shifts\UpdateShiftRequest;

class ShiftApiController extends Controller
{
    public function __construct(protected ShiftService $shiftService)
    {
    }
    public function index(Request $request)
    {
        return $this->shiftService->all();
    }
    public function store(StoreShiftRequest $request)
    {
        return $this->shiftService->create($request->validated());
    }
    public function update(UpdateShiftRequest $request, $id)
    {
        return $this->shiftService->update($request->validated(), $id);
    }
    public function destroy($id)
    {
        return $this->shiftService->destroy($id);
    }
    public function show($id)
    {
        return $this->shiftService->show($id);
    }
}
