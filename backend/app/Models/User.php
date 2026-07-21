<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
#[Fillable(['name', 'email', 'password'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable implements JWTSubject
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'employee_code',
        'last_login_at',
        'is_active',
        'profile_picture',
        'department_id',
        'designation_id',
        'employment_type_id',
        'branch_id',
        'shift_id',
        'manager_id',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];


    }
    public function roles()
    {
        return $this->belongsToMany(Role::class, 'role_users', 'user_id', 'role_id');
    }
    public function getJWTIdentifier(): mixed
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims(): array
    {
        return [];
    }

    public function getRoles()
    {
        return $this->roles()->pluck('name');
    }
    public function getPermissions()
    {
        return $this->roles()->with('permissions')->get()->pluck('permissions')->flatten()->pluck('name')->unique();
    }
    public function department()
    {
        return $this->belongsTo(Department::class);
    }
    public function designation()
    {
        return $this->belongsTo(Designation::class);
    }
    public function employmentType()
    {
        return $this->belongsTo(EmploymentType::class);
    }
    public function branch()
    {
        return $this->belongsTo(Branch::class);
    }

    public function manager()
    {
        return $this->belongsTo(User::class, 'manager_id');
    }
    public function subordinates()
    {
        return $this->hasMany(User::class, 'manager_id');
    }
    public function profile()
    {
        return $this->hasOne(EmployeeProfile::class);
    }
    public function refreshTokens()
    {
        return $this->hasMany(RefreshToken::class);
    }

}
