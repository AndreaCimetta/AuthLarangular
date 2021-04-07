<?php

namespace App\Http\Middleware;

use App\UtilityLibraries\CustomResponse;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Exceptions\HttpResponseException;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {
        if (! $request->expectsJson()) {
            return route('login');
        }
    }

    protected function unauthenticated($request, array $guards)
    {

//        throw new AuthenticationException(
//            'Unauthenticated.', $guards, null
//        );

        // overiding to avoid AuthenticationException response and error in redirectTo function
        throw (new HttpResponseException(CustomResponse::sendErrorResponse('Unauthenticated', null, Response::HTTP_UNAUTHORIZED)));
    }
}
