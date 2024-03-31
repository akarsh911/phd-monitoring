<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
// use App\Models\Role;
// use Faker\Generator;
use Illuminate\Support\Facades\App;
use App\Http\Controllers\StudentController;

Route::get('', function (Request $request) {
    $user= Auth::user();
    $permissions = $user->role;
    if($permissions->can_read_all_students == 'true'){
        $students= \App\Models\Student::all();
    }
    else if($permissions->can_read_department_students == 'true'){
        $students= \App\Models\Student::where('department_id',$user->department_id)->get();
    }
    else if($permissions->can_read_supervised_students == 'true'){
        $students= \App\Models\Faculty::where('user_id',$user->id)->first()->supervisedStudents()->get();
    }
    else if($permissions->can_read_doctored_students == 'true'){
        $students= \App\Models\Faculty::where('user_id',$user->id)->first()->doctoredStudents()->get();
    }
    else{
        $students= [];
    }
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/add', [StudentController::class, 'add'])->middleware('auth:sanctum');