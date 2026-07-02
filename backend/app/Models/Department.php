<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Department extends Model
{
    use SoftDeletes;
    protected $table = "departments";
    protected $fillable = [
        "name",
        "code",
        "description",
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
}
