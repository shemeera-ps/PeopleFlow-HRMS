<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Requests\User\AssignRoleRequest;
use App\Http\Requests\User\RemoveRoleRequest;
use Illuminate\Http\Request;
use App\Services\UserService;
class UserController extends Controller
{

    public function __construct(protected UserService $userService)
    {

    }
    public function index(Request $request)
    {
        return $this->userService->getAllUsers($request);
    }

    public function store(StoreUserRequest $request)
    {
        //dd($request->all());
        return $this->userService->createUser($request->validated());
    }

    public function update(UpdateUserRequest $request, $id)
    {
        return $this->userService->updateUser($request->validated(), $id);
    }
    public function destroy($id)
    {
        return $this->userService->deleteUser($id);
    }
    public function show($id)
    {
        return $this->userService->getUserById($id);
    }
    public function assignRoles(AssignRoleRequest $request, $id)
    {
        return $this->userService->assignRolesToUser($request->validated(), $id);
    }
    public function getAssignedRoles($id)
    {
        return $this->userService->getAssignedRoles($id);
    }

    public function removeRoles(RemoveRoleRequest $request)
    {
        return $this->userService->removeRolesFromUser($request->validated());
    }
}
