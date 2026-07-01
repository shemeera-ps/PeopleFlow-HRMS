<?php
namespace App\Services;
use App\Models\User;
use App\Constants\Messages;
use App\Helpers\ApiResponse;

class UserService
{
    public function getAllUsers($request)
    {
        $per_page = $request->per_page ?? 10;
        $query = User::where('is_active', true)->query();

        // Apply filters based on request parameters
        if ($request->has('name')) {
            $query->where('name', 'like', '%' . $request->input('name') . '%');
        }

        if ($request->has('employee_code')) {
            $query->where('employee_code', 'like', '%' . $request->input('employee_code') . '%');
        }

        if ($request->has('email')) {
            $query->where('email', 'like', '%' . $request->input('email') . '%');
        }

        // Paginate the results
        $users = $query->orderBy('name', 'asc')->paginate($per_page);
        return ApiResponse::success("Users retrieved successfully.", $users);
    }

    public function createUser(array $data)
    {
        $user = User::create($data + [
            'password' => bcrypt($data['password']),
            'email_verified_at' => now(),
            'is_active' => true,
        ]);

        return ApiResponse::success("User created successfully.", $user);
    }
    public function updateUser(array $data, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return ApiResponse::error(Messages::NOT_FOUND, null, 404);
        }
        $user->update($data + ['password' => bcrypt($data['password'])]);
        return ApiResponse::success("User updated successfully.", $user);
    }
    public function deleteUser(int $id)
    {
        $user = User::find($id);
        if (!$user) {
            return ApiResponse::error(Messages::NOT_FOUND, null, 404);
        }
        $user->update(['is_active' => false]);
        return ApiResponse::success('User Deactivated successfully', $user);
    }
    public function getUserById($id)
    {
        $user = User::with('roles')->find($id);
        if (!$user) {
            return ApiResponse::error(Messages::NOT_FOUND, null, 404);
        }


        return ApiResponse::success("User retrieved successfully.", $user);
    }

    public function assignRolesToUser(array $data)
    {
        $user = User::find($data["user_id"]);
        if (!$user) {
            return ApiResponse::error(Messages::NOT_FOUND, null, 404);
        }
        $user->roles()->sync($data["role_ids"]);
        return ApiResponse::success("Roles assigned to user successfully.", $user);
    }

    public function getAssignedRoles($id)
    {
        $user = User::find($id);
        if (!$user) {
            return ApiResponse::error(Messages::NOT_FOUND, null, 404);
        }
        $roles = $user->roles()->get();
        return ApiResponse::success("Roles retrieved successfully.", $roles);
    }
    public function removeRolesFromUser(array $data)
    {
        $user = User::find($data["user_id"]);
        if (!$user) {
            return ApiResponse::error(Messages::NOT_FOUND, null, 404);
        }
        $user->roles()->detach($data["role_ids"]);
        return ApiResponse::success("Roles removed from user successfully.", $user);
    }
}