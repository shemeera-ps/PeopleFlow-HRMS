<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Models\Role;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@peopleflow.com',
            'employee_code' => 'EMP0001',
            'password' => bcrypt('admin123'), // Make sure to hash the password
        ])->roles()->attach(Role::where('name', 'Super Administrator')->first());
    }
}
