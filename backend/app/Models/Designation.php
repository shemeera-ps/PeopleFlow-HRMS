<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Designation extends Model
{
    protected $table = "designations";
    protected $fillable = [
        "name",
        "code",
        "description",
        "department_id",
        "is_active",
        "created_by",
        "updated_by",
    ];

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
    public function department()
    {
        return $this->belongsTo(Department::class, 'department_id');
    }

    public function user()
    {
        return $this->hasMany(User::class, 'designation_id');
    }


}
