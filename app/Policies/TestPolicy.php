<?php

namespace App\Policies;

use App\Models\Test;
use App\Models\User;
use App\Models\Assignment;
use Illuminate\Auth\Access\HandlesAuthorization;

class TestPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can create tests.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function view(User $user, Test $test)
    {
        // Allow viewing if the user is authenticated
        return $user->id=== $test->user_id;
    }
}
