<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RefreshToken extends Model
{
    protected $table = "refresh_tokens";
    protected $fillable = [
        'user_id',
        'token_hash',
        'ip_address',
        'user_agent',
        'expires_at',
        'revoked',
        'last_used_at',
    ];

    protected $casts = [
        'expires_at' => 'datetime',
        'last_used_at' => 'datetime',
        'revoked' => 'boolean',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
