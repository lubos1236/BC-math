<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use Illuminate\Http\Request;
use App\Models\Test;
use App\Models\TestTheme;
use Illuminate\Support\Facades\Auth;
use App\Enums\Role;
use App\Models\User;

class UserController extends Controller
{
    public function getNonAdminUsers(Request $request)
    {
        $this->authorize('adminOnly', User::class);


        $users = User::where('role', '!=', "Admin")->select('id','name','email','role')->get();
        return response()->json($users);
    }
    public function editUser(Request $request)
    {
        $this->authorize('adminOnly', User::class);
        $user = User::find($request->user['id']);
        if ($user) {
            $user->name = $request->user['name'];
            $user->email = $request->user['email'];
            $user->role = $request->user['role'];
            $user->save();
            return response()->json(['message' => 'User updated successfully']);
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }
    public function deleteUser(Request $request)
    {
        $this->authorize('adminOnly', User::class);
        $user = User::find($request->id);
        if ($user) {
            $user->delete();
            return response()->json(['message' => 'User deleted successfully']);
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }
}
