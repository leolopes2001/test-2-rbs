<?php

namespace App\Services;

use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthService
{
    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function register(array $data)
    {
        $data['password'] = Hash::make($data['password']);
        return $this->userRepository->create($data);
    }

    public function login($email, $password)
    {
        if (Auth::attempt(['email' => $email, 'password' => $password])) {
            $user_auth = Auth::user();

            $user['token'] = $user_auth->createToken('MyAppLeo')->plainTextToken;
            $user['name'] = $user_auth->name;
            $user['email'] = $user_auth->email;

           return $user;
        }
        return null;
    }
}
