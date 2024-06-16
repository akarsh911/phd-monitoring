<?php
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\FacultyController;
use Illuminate\Support\Facades\Auth;

Route::get('',[FacultyController::class, 'list'])->middleware('auth:sanctum');

Route::post('/add', [FacultyController::class, 'add'])->middleware('auth:sanctum');