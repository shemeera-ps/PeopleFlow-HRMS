<?php
namespace App\Services;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Constants\Messages;
use App\Helpers\ApiResponse;
use App\Http\Resources\EmployeeProfileResource;
use App\Models\EmployeeProfile;

class UserService
{
    public function getAllUsers($request)
    {
        $per_page = $request->per_page ?? 10;
        $isActive = $request->input('is_active') ?? true;
        $query = User::where('is_active', $isActive);
        $sortBy = $request->sort_by ?? "name";
        $sortOrder = $request->sort_order ?? "asc";

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
        if ($request->has('role_id')) {
            $query->whereHas('roles', function ($q) use ($request) {
                $q->where('roles.id', $request->input('role_id'));
            });
        }

        // Paginate the results
        $users = $query->orderBy($sortBy, $sortOrder)->paginate($per_page);
        return ApiResponse::success("Users retrieved successfully.", $users);
    }

    public function createUser(array $data)
    {
        $user = User::create($data + [
            'password' => bcrypt($data['password']),
            'email_verified_at' => now(),
            'is_active' => true,
        ]);

        return ApiResponse::success("User created successfully.", new UserResource($user));
    }
    public function updateUser(array $data, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return ApiResponse::error(Messages::NOT_FOUND, null, 404);
        }
        $user->update($data + ['password' => bcrypt($data['password'])]);
        return ApiResponse::success("User updated successfully.", new UserResource($user));
    }
    public function deleteUser(int $id)
    {
        $user = User::find($id);
        if (!$user) {
            return ApiResponse::error(Messages::NOT_FOUND, null, 404);
        }
        $user->update(['is_active' => false]);
        return ApiResponse::success('User Deactivated successfully', new UserResource($user));
    }
    public function getUserById($id)
    {
        $user = User::with('roles', 'roles.permissions', 'departments', 'designations', 'employmentTypes')->find($id);
        if (!$user) {
            return ApiResponse::error(Messages::NOT_FOUND, null, 404);
        }


        return ApiResponse::success("User retrieved successfully.", new UserResource($user));
    }

    public function assignRolesToUser(array $data)
    {
        $user = User::find($data["user_id"]);
        if (!$user) {
            return ApiResponse::error(Messages::NOT_FOUND, null, 404);
        }
        $user->roles()->sync($data["role_ids"]);
        return ApiResponse::success("Roles assigned to user successfully.", new UserResource($user));
    }

    public function getAssignedRoles($id)
    {
        $user = User::find($id);
        if (!$user) {
            return ApiResponse::error(Messages::NOT_FOUND, null, 404);
        }
        $roles = $user->roles()->get();
        return ApiResponse::success("Roles retrieved successfully.", new UserResource($user));
    }
    public function removeRolesFromUser(array $data)
    {
        $user = User::find($data["user_id"]);
        if (!$user) {
            return ApiResponse::error(Messages::NOT_FOUND, null, 404);
        }
        $user->roles()->detach($data["role_ids"]);
        return ApiResponse::success("Roles removed from user successfully.", new UserResource($user));
    }
    public function updateOrganizationDetails(array $data, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return ApiResponse::error(Messages::NOT_FOUND, null, 404);
        }
        $user->update($data);
        return ApiResponse::success("User organization details updated successfully.", new UserResource($user));
    }

    public function updateEmployeeProfile(array $data, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return ApiResponse::error(Messages::NOT_FOUND, null, 404);
        }

        $profile = EmployeeProfile::firstOrNew([
            'user_id' => $user->id
        ]);

        if (!$profile->exists) {
            $profile->created_by = auth()->id();
        }

        $profile->fill($data);
        $profile->updated_by = auth()->id();
        $profile->save();

        return ApiResponse::success(
            "User employee profile updated successfully.",
            new EmployeeProfileResource($profile->load('user'))
        );
    }
}