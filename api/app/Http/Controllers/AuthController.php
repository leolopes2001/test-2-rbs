<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Services\AuthService;

class AuthController extends BaseController
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'c_password' => 'required|same:password',
        ], [
            'name.required' => 'O campo nome é obrigatório.',
            'email.required' => 'O campo e-mail é obrigatório.',
            'email.email' => 'O e-mail deve ser um endereço de e-mail válido.',
            'email.unique' => 'O e-mail informado já está cadastrado.',
            'password.required' => 'O campo senha é obrigatório.',
            'c_password.required' => 'A confirmação da senha é obrigatória.',
            'c_password.same' => 'A confirmação da senha deve ser igual à senha.',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 400);
        }

        $user = $this->authService->register($request->all());
        $success['email'] = $user->email;
        $success['name'] = $user->name;

        return $this->sendResponse($success, 'User register successfully.');
    }

    public function login(Request $request)
    {
        $user = $this->authService->login($request->email, $request->password);

        if ($user) {
            return $this->sendResponse($user, 'User login successfully.');
        } else {
            return $this->sendError('Unauthorised', ['error' => 'Unauthorised'], 401);
        }
    }

    public function validateToken(Request $request)
    {
        $user = $request->user();
    
        return $this->sendResponse(['name' => $user->name], 'Token is valid.');
    }
}
