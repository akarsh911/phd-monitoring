<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
// use App\Models\Role;
// use Faker\Generator;
use Illuminate\Support\Facades\App;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\UserController;

Route::get('/', [StudentController::class, 'list'])->middleware('auth:sanctum');
  

Route::post('/add', [StudentController::class, 'add'])->middleware('auth:sanctum');


Route::prefix('{id}')->group(function () {
    Route::get('', [StudentController::class, 'get'])->middleware('auth:sanctum');
    
    Route::get('/forms', [UserController::class, 'listForms'])->middleware('auth:sanctum');

    Route::prefix('/forms')->group(function () {
        Route::middleware('parseRollNumber')->group(function () {
            require base_path('routes/base/forms.php');
        });
    });
    
    
    

    
    
});