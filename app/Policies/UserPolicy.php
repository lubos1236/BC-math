<?php

namespace App\Policies;

use App\Enums\Role;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class UserPolicy
{

    public function adminOnly(User $user): bool
    {
        return $user->role === Role::Admin;
    }

}
