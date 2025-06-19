<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use App\Models\Theme;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ThemeController extends Controller
{
    public function getAll()
    {
        // Get themes with assignment ids
        $themes = Theme::all()->map(function ($theme) {
            return [
                'id' => $theme->id,
                'title' => $theme->title,
                'text' => $theme->text,
            ];
        });

        return response()->json($themes);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'text' => 'required|string',
        ]);

        $theme = Theme::create($validated);

        return response()->json(['message' => 'Theme created successfully', 'theme' => $theme]);
    }

    public function delete($id)
    {
        $theme = Theme::findOrFail($id);


        $theme->delete();

        return response()->json(['message' => 'Theme deleted successfully']);
    }


    // New edit method for Theme
    public function editTheme(Request $request)
    {
        // Validate the request
        $validated = $request->validate([
            'id' => 'required|integer',
            'title' => 'required|string',
            'text' => 'required|string',
        ]);

        // Find the theme using the validated ID
        $theme = Theme::findOrFail($validated['id']); // Používame ID z validated dát

        // Update the theme
        $theme->update([
            'title' => $validated['title'],
            'text' => $validated['text'],
        ]);

        return response()->json(['message' => 'Theme updated successfully']);
    }

}
