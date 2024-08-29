<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

Route::get('/users', [UserController::class, 'index'])->middleware('auth:sanctum');
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login'])->name('login');
Route::middleware('auth:sanctum')->get('/token/validate', [AuthController::class, 'validateToken']);




