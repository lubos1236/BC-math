<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','register', 'refresh']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }
    public function register()
    {
        $validator=Validator::make(request()->all(),[
            'name' => 'required|string|max:100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);
        if($validator->fails()){
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $validated=$validator->validated();
        $validated['password']=Hash::make($validated['password']);
        $user=User::create($validated);
        $token = auth()->login($user);
        return $this->respondWithToken($token);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        $user = auth()->user();
        if ($user) {
            $user->refresh_token = null;
            $user->save();
        }

        auth()->logout();

        // Zmažeme refresh_token cookie nastavením vypršania do minulosti
        return response()->json(['message' => 'Successfully logged out'])
            ->withCookie(cookie('refresh_token', '', -1, '/', null, false, true, false, 'Strict'));
    }


    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh(Request $request)
    {
        $cookie = $request->cookie('refresh_token');
        if (!$cookie) {
            return response()->json(['error' => 'No refresh token'], 401);
        }

        $hashed = hash('sha256', $cookie);
        $user = User::where('refresh_token', $hashed)->first();

        if (! $user) {
            return response()->json(['error' => 'Invalid refresh token'], 401);
        }

        // Prihlás používateľa a vytvor nový token
        $token = auth()->login($user);

        return $this->respondWithToken($token);
    }

    /**
     * Get the token array structure.
     *
     * @param string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        $user = auth()->user();
        $refreshToken = Str::random(64);
        $user->refresh_token = hash('sha256', $refreshToken);
        $user->save();

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires' => auth()->factory()->getTTL(),
            'user' => $user
        ])->cookie('refresh_token', $refreshToken, 60*24*7,'/',null,false,true,false,'Strict');//7 dni
    }
}
