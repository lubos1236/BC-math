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
use OpenApi\Annotations as OA;

class AssignmentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    /**
     * @OA\Info(
     *     title="Moja API Dokumentácia",
     *     version="1.0.0",
     *     description="Popis mojej REST API"
     * )
     *
     * @OA\Server(
     *     url=L5_SWAGGER_CONST_HOST,
     *     description="Hlavný server"
     * )
     *
     * @OA\SecurityScheme(
     *     securityScheme="bearerAuth",
     *     type="http",
     *     scheme="bearer"
     * )
     * @OA\Get(
     *     path="/api/users",
     *     tags={"Users"},
     *     summary="Zoznam používateľov",
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Úspešné načítanie používateľov"
     *     )
     * )
     */
    public function getAll()
    {
        //$this->authorize("viewAny", Assignment::class);
        $assignments = Assignment::with('hints')->get();
        return response()->json($assignments);
    }

    public function create(Request $request)
    {
        //return reqquest
        //return $request->all();
        //$this->authorize("create", User::class);
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
    }

    public function get($n)
    {
        $this->authorize("viewAny", Assignment::class);
        $assignments = Assignment::with('hints')->inRandomOrder()->limit($n)->get();
        return response()->json($assignments);
    }
    public function getByIds(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'integer',
        ]);
        $assignments=Assignment::with('hints')->whereIn('id',$request->input('ids'))->get();
        $this->authorize('viewAny', Assignment::class);
        return response()->json($assignments);
    }
    public function getByThemeIds(Request $request)
    {
        $request->validate([
            'subject' => 'required|array',
            'count' => 'required|integer',
        ]);
        $s=$request->input('subject');
        $c=$request->input('count');
        $assignments = collect($s)->flatMap(function ($s) use ($c) {
            return Assignment::with('hints')->
            where('subject_id', $s)->inRandomOrder()->limit($c)->get();
        });
        $this->authorize('viewAny', Assignment::class);
        return response()->json($assignments);
    }
}
