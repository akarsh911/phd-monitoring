<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
// use App\Models\Role;
// use Faker\Generator;
use Illuminate\Support\Facades\App;
use App\Http\Controllers\StudentController;

Route::get('/', [StudentController::class, 'list'])->middleware('auth:sanctum');
  

Route::post('/add', [StudentController::class, 'add'])->middleware('auth:sanctum');
Route::get('/{id}', [StudentController::class, 'get'])->middleware('auth:sanctum');