<?php
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\FacultyController;
use Illuminate\Support\Facades\Auth;

Route::get('',function (Request $request){
    $faculties = \App\Models\Faculty::all();
    return response()->json($faculties,200);
});

Route::post('/add', [FacultyController::class, 'add'])->middleware('auth:sanctum');