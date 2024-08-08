<?php
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\PublicationController;
use Illuminate\Support\Facades\Auth;


Route::post('/add', [PublicationController::class, 'store'])->middleware('auth:sanctum');
