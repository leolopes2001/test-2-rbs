<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthRepository extends BaseRepository
{
    public function __construct(User $user)
    {
        parent::__construct($user); 
    }

    public function register(array $data): User
    {
        $data['password'] = Hash::make($data['password']);
        return $this->model->create($data); 
    }

    public function login(string $email, string $password): ?User
    {
        $user = $this->model->where('email', $email)->first(); 

        if ($user && Hash::check($password, $user->password)) {
            return $user;
        }

        return null;
    }
}
