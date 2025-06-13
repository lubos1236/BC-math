<?php

use App\Http\Controllers\AssignmentController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HintController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ThemeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::group(['middleware' => 'api'], function () {
    // Authentication routes
    Route::group(['prefix' => 'auth'], function () {
        Route::post('login', [AuthController::class, 'login']);
        Route::post('register', [AuthController::class, 'register']);
        Route::post('logout', [AuthController::class, 'logout']);
        Route::post('refresh', [AuthController::class, 'refresh']);
        Route::post('me', [AuthController::class, 'me']);
    });

    // Protected routes requiring authentication
    Route::middleware('auth')->group(function () {
        Route::get('/user', function (Request $request) {
            return $request->user();
        });

        // Assignments routes
        Route::post('/assignments/create', [AssignmentController::class, 'create']);
        Route::post('/assignments', [AssignmentController::class, 'getByIds']);
        Route::get('/assignments', [AssignmentController::class, 'getAll']);
        Route::post('/assignmentsBySubject', [AssignmentController::class, 'getByThemeIds']);
        Route::delete('/assignments/{id}', [AssignmentController::class, 'delete']);
        Route::get('/assignments/random/{n}', [AssignmentController::class, 'get']);
        Route::put('/assignments/edit', [AssignmentController::class, 'editAssignment']);

        Route::get('/test', [TestController::class,'index']);
        Route::post('/test', [TestController::class,'store']);

        Route::get('/theme', [ThemeController::class,'getAll']);
        Route::post('/theme/create', [ThemeController::class,'store']);
        Route::delete('/theme/{id}', [ThemeController::class,'delete']);
        Route::put('/theme/edit', [ThemeController::class,'editTheme']);

        Route::get('/users', [UserController::class,'getNonAdminUsers']);
        Route::post('/users/edit', [UserController::class,'editUser']);
        Route::delete('/users/delete', [UserController::class,'deleteUser']);

        Route::get('/assignments/{assignmentId}/hints', [AssignmentController::class, 'getHintsForAssignment']);
        Route::post('/assignments/{assignmentId}/hints', [AssignmentController::class, 'attachHintsToAssignment']);
        Route::get('/hints', [HintController::class, 'index']);
        Route::post('/hints', [HintController::class, 'store']);
        Route::put('/hints/{id}', [HintController::class, 'update']);
        Route::delete('/hints/{id}', [HintController::class, 'destroy']);

    });
});
