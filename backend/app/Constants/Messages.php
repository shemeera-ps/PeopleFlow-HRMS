<?php

namespace App\Constants;

class Messages
{
    // Success
    public const LOGIN_SUCCESS = 'Login successful.';
    public const LOGOUT_SUCCESS = 'Logout successful.';
    public const CREATED = 'Record created successfully.';
    public const UPDATED = 'Record updated successfully.';
    public const DELETED = 'Record deleted successfully.';

    // Errors
    public const INVALID_CREDENTIALS = 'Invalid username or password.';
    public const ACCOUNT_DISABLED = 'Your account has been disabled.';
    public const UNAUTHORIZED = 'Unauthorized.';
    public const FORBIDDEN = 'Permission denied.';
    public const NOT_FOUND = 'Record not found.';

    public const TOKEN_REFRESHED = "Authorization token refreshed successfully.";
}