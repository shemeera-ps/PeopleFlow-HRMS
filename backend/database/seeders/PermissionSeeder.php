<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Permission;
class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            'dashboard.view',
            'employee.view',
            'employee.create',
            'employee.update',
            'employee.delete',
            'department.view',
            'department.create',
            'department.update',
            'department.delete',
            'role.manage',
            'permission.manage'
        ];
        foreach ($permissions as $permission) {
            Permission::create([
                'name' => $permission,
                'description' => 'Permission to ' . str_replace('.', ' ', $permission),
                'is_active' => true,
                'created_by' => 1, // Assuming the first user is the creator
            ]);
        }
    }



}

