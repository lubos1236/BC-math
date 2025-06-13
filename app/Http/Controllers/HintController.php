<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use App\Models\Hint;
use App\Models\Theme;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class HintController extends Controller
{
    public function index()
    {
        return response()->json(Hint::all());
    }

    // Získaj konkrétnu nápovedu podľa ID
    /*public function show($id)
    {
        $hint = Hint::find($id);

        if (!$hint) {
            return response()->json(['message' => 'Hint not found'], 404);
        }

        return $hint;
    }*/

    // Vytvor novú nápovedu
    public function store(Request $request)
    {
        $validated = $request->validate([
            'hint' => 'required|string|max:1000',
        ]);

        $hint = Hint::create($validated);

        return response()->json($hint, 201);
    }

    // Aktualizuj existujúcu nápovedu
    public function update(Request $request, $id)
    {
        $hint = Hint::find($id);

        if (!$hint) {
            return response()->json(['message' => 'Hint not found'], 404);
        }

        $validated = $request->validate([
            'hint' => 'required|string|max:1000',
        ]);

        $hint->update($validated);

        return response()->json($hint);
    }

    // Zmaž nápovedu
    public function destroy($id)
    {
        $hint = Hint::find($id);

        if (!$hint) {
            return response()->json(['message' => 'Hint not found'], 404);
        }

        $hint->delete();

        return response()->json(['message' => 'Hint deleted']);
    }
}
