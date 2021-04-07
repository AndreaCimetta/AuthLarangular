<?php

namespace App\Http\Controllers;

use App\User;
use App\UtilityLibraries\CustomResponse;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Http\Requests\SignUpRequest;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','signup']]);
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
            return CustomResponse::sendErrorResponse('Email or password doesn\'t exist');
        }

        return $this->respondWithToken($token);
    }

    public function signup(SignUpRequest $request)
    {

        $user = User::create($request->all());

        return $this->login($request);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return CustomResponse::sendResponse(auth()->user(),null,Response::HTTP_OK);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        // return response()->json(['message' => 'Successfully logged out']);


//        return $this->sendResponse([],true,Response::HTTP_OK);
        return CustomResponse::sendResponse(null,null,Response::HTTP_OK); // TODO-AC: VERIFICARE CHE FUNZIONI
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        $responseData = [
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'userData' => auth()->user()
        ];
        return CustomResponse::sendResponse($responseData, null,Response::HTTP_OK );
    }
}
