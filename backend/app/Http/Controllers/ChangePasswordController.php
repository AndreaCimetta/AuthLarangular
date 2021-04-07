<?php

namespace App\Http\Controllers;

use App\User;
use App\UtilityLibraries\CustomResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\ChangePasswordRequest;

class ChangePasswordController extends Controller
{
    public function process(ChangePasswordRequest $request)
    {
        return $this->getPasswordResetTableRow($request)->count() > 0? $this->changePassword($request) : $this->tokenNotFoundResponse();
    }

    private function getPasswordResetTableRow($request)
    {
        return DB::table('password_resets')->where(['email'=> $request->email, 'token' =>$request->resetToken]);
    }

    private function tokenNotFoundResponse()
    {
        return CustomResponse::sendErrorResponse('Token and Email is incorrect', null, Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    private function changePassword($request)
    {
        $user = User::whereEmail($request->email)->first();
        $user->update(['password' => $request->password]);
        $this->getPasswordResetTableRow($request)->delete();
        return CustomResponse::sendResponse('Password Successfully Changed', null);
    }
}
