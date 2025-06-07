<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use App\Models\Theme;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ThemeController extends Controller
{
    public function getAll()
    {
        //het themes with assignments ids
        $themes = Theme::with('assignments:id')->get()->map(function ($theme) {
            return [
                'id' => $theme->id,
                'title' => $theme->title,
                'text' => $theme->text,
                'assignment_ids' => $theme->assignments->pluck('id'),
            ];
        });
        return response()->json($themes);
    }
/*
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

        //$this->authorize('delete', $assignment);

        $assignment->delete();

        return response()->json(null, 204);
    }
    public function editAssignment(Request $request)
    {
        //$this->authorize("update", Assignment::class);
        $request->validate([
            'id' => 'required|integer',
            'subject_id' => 'required|integer',
            'task' => 'required|string',
            'variables' => 'required|string',
            'solution' => 'required|string',
        ]);
        $assignment = Assignment::findOrFail($request->input('id'));
        $assignment->update($request->all());
        return response()->json(['message' => 'Assignment updated successfully']);
    }*/
}
