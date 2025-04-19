<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Test;
use App\Models\TestTheme;
use Illuminate\Support\Facades\Auth;

class TestController extends Controller
{
    public function store(Request $request)
    {

        try {
            // Validate request
            $validatedData = $request->validate([
                'success_rate' => 'required|integer',
                'themes' => 'required|array',
                'themes.*.theme' => 'required|integer',
                'themes.*.r_count' => 'required|integer|min:0',
                'themes.*.w_count' => 'required|integer|min:0',
            ]);

            // Get authenticated user
            $user = Auth::user();
            if (!$user) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            // Create test record
            $test = Test::create([
                'user_id' => $user->id,
                'success_rate' => $validatedData['success_rate'],
            ]);

            // Attach themes to test
            foreach ($validatedData['themes'] as $theme) {
                TestTheme::create([
                    'test_id' => $test->id,
                    'theme' => $theme['theme'],
                    'r_count' => $theme['r_count'],
                    'w_count' => $theme['w_count'],
                ]);
            }

            return response()->json(['message' => 'Test stored successfully'], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function index()
    {
        try {
            $user = Auth::user();
            if (!$user) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            $tests = Test::where('user_id', $user->id)->with('themes')->get();
            return response()->json($tests, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
