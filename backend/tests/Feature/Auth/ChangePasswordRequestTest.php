<?php

use App\Http\Requests\Auth\ChangePasswordRequest;
use App\Models\User;

describe('change password request authorization', function () {
    it('authorizes authenticated api users', function () {
        $user = User::factory()->create();

        $this->actingAs($user, 'api');

        $request = new ChangePasswordRequest();

        expect($request->authorize())->toBeTrue();
    });
});
