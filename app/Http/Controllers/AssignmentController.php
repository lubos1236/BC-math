<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AssignmentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function create()
    {
        $this->authorize("create", User::class);
        $request->validate([
            'subject_id' => 'required|integer',
            'task' => 'required|string',
            'variables' => 'required|string',
            'solution' => 'required|string',
        ]);
        $assignment = Assignment::create($request->all());
        return response()->json($assignment, 201);
    }
    public function delete($id)
    {
        $assignment = Assignment::findOrFail($id);

        $this->authorize('delete', $assignment);

        $assignment->delete();

        return response()->json(null, 204);
    }

    public function get($n)
    {
        $this->authorize("viewAny", Assignment::class);
        $assignments = Assignment::inRandomOrder()->limit($n)->get();
        return response()->json($assignments);
    }
    public function getByIds(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'integer',
        ]);
        $assignments=Assignment::whereIn('id',$request->input('ids'))->get();
        $this->authorize('viewAny', Assignment::class);
        //return response()->json(auth()->user());
        return response()->json($assignments);
    }
}
