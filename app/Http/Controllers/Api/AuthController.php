<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;

class AuthController extends Controller
{
    public function signup(SignupRequest $request) {
        $data = $request->validated();
        
        /** @var \App\Models\User $user */

        $User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        $token = $user->createToken( 'main') ->plainTextToken;
        return response(compact('user', 'token'));
    }
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        
        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'Provided email address or password is incorrect',
            ]);
        }
        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));

    }

    

    public function logout(Request $resquest) {
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }
}
