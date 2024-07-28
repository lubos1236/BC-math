<?php

use App\Http\Controllers\AssignmentController;
use App\Http\Controllers\AuthController;
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
        Route::delete('/assignments/{id}', [AssignmentController::class, 'delete']);
        Route::get('/assignments/random/{n}', [AssignmentController::class, 'get']);
    });
});
/*OK
Route::group(['middleware' => 'api'], function () {
    Route::middleware('auth')->get('/user', function (Request $request) {
        return $request->user();
    });

    // Auth routes
    Route::group(['prefix' => 'auth'], function () {
        Route::post('login', [AuthController::class, 'login']);
        Route::post('register', [AuthController::class, 'register']);
        Route::post('logout', [AuthController::class, 'logout']);
        Route::post('refresh', [AuthController::class, 'refresh']);
        Route::post('me', [AuthController::class, 'me']);
    });

    // Assignments routes
    Route::post('/assignments/create', [AssignmentController::class, 'create']);
    Route::post('/assignments', [AssignmentController::class, 'getByIds']);
    Route::delete('/assignments/{id}', [AssignmentController::class, 'delete']);
    Route::get('/assignments/random/{n}', [AssignmentController::class, 'get']);
});
*/
/*OLD
Route::middleware('auth')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => 'api', 'prefix' => 'auth'], function ($router) {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('logout', [AuthController::class,'logout']);
    Route::post('refresh', [AuthController::class,'refresh']);
    Route::post('me', [AuthController::class,'me']);
});

Route::group(['middleware' => 'auth'], function ($router) {
    Route::post('assignments', [AssignmentController::class, 'create']);
    Route::get('assignments/{n}', [AssignmentController::class, 'get']);
    Route::get('assignments/{id}', [AssignmentController::class, 'getById']);
});*/
