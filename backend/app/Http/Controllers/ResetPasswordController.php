<?php

namespace App\Http\Controllers;

use App\User;
use App\UtilityLibraries\CustomResponse;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Carbon;
use App\Mail\ResetPasswordMail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class ResetPasswordController extends Controller
{
    public function sendEmail(Request $request)
    {
       if(!$this->validateEmail($request->email)){
           return CustomResponse::sendErrorResponse('Email doesn\'t found on our database');
       }

       $this->send($request->email);
        return CustomResponse::sendResponse('Reset Email is send successfully, please check your inbox', null);
    }

    public function send($email){
        $token = $this->createToken($email);
        Mail::to($email)->send(new ResetPasswordMail($token));
    }

    public function validateEmail($email){
        return !!User::where('email', $email)->first();
    }

    public function createToken($email){
        $oldToken = DB::table('password_resets')->where('email', $email)->first();
        if($oldToken){
           return $oldToken->token;
        }
        $token = Str::random(60);
        $this->saveToken($token,$email);
        return $token;
    }

    public function saveToken($token, $email){
        DB::table('password_resets')->insert([
            'email' => $email,
            'token' => $token,
            'created_at' => Carbon::now()
        ]);
    }

    public function successResponse(){
        return response()->json([
            'success' => 'Reset Email is send successfully, please check your inbox'
        ], Response::HTTP_OK);
    }

    public function failedResponse(){
        return response()->json([
            'error' => 'Email doesn\'t found on our database'
        ], Response::HTTP_NOT_FOUND);
    }
}
