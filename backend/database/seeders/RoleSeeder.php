<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = ['Super Administrator', 'HR Administrator', 'Department Manager', 'Team Lead', 'Employee'];

        foreach ($roles as $role) {
            Role::create([
                'name' => $role,
                'description' => $role . ' role',
                'is_active' => true,
                'created_by' => 1,
            ]);
        }
    }
}
