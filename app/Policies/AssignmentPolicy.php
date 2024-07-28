<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Assignment;
use Illuminate\Auth\Access\HandlesAuthorization;

class AssignmentPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can create assignments.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        // Allow only authenticated users to create assignments
        return $user->exists;
    }

    /**
     * Determine whether the user can delete the assignment.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Assignment  $assignment
     * @return mixed
     */
    public function delete(User $user, Assignment $assignment)
    {
        // Allow deletion only if the user exist  xxxx is authenticated and is the owner of the assignment
        return $user->exists;
    }

    /**
     * Determine whether the user can view any assignments.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        // Allow all authenticated users to view assignments
        return $user->exists;
    }
    /**
     * Determine whether the user can view the specified assignment.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Assignment  $assignment
     * @return mixed
     */
    public function view(User $user, Assignment $assignment)
    {
        // Allow viewing if the user is authenticated
        return $user->exists;
    }
}
