<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('refresh_tokens', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnDelete();

            // Store SHA256 hash of refresh token
            $table->string('token_hash', 64)->unique();

            // Optional information
            $table->string('ip_address')->nullable();
            $table->text('user_agent')->nullable();

            // Token expiry
            $table->timestamp('expires_at');

            // Revocation flag
            $table->boolean('revoked')->default(false);

            // Last usage (optional but useful)
            $table->timestamp('last_used_at')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('refresh_tokens');
    }
};
