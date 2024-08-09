<?php
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\PresentationController;
use Illuminate\Support\Facades\Auth;


Route::post('/', [PresentationController::class, 'load'])->middleware('auth:sanctum');
Route::post('/update', [PresentationController::class, 'update'])->middleware('auth:sanctum');
Route::post('/submit', [PresentationController::class, 'submit'])->middleware('auth:sanctum');