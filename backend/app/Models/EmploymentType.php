<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmploymentType extends Model
{
    protected $table = "employment_types";
    protected $fillable = [
        'name',
        'is_active',
    ];

    public function users()
    {
        return $this->hasMany(User::class, 'employment_type_id');
    }
}
