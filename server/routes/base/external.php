<?php

use App\Http\Controllers\ExternalController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;


Route::get('',[ExternalController::class, 'list'])->middleware('auth:sanctum');

Route::post('/add', [ExternalController::class, 'add'])->middleware('auth:sanctum');

Route::post('/autocomplete', [ExternalController::class, 'autoComplete'])->middleware('auth:sanctum');

Route::post('/institution/autocomplete', [ExternalController::class, 'autoCompleteInstitution'])->middleware('auth:sanctum');