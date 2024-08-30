<?php
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\IrbSubFormController;

Route::post('',[IrbSubFormController::class, 'load'])->middleware('auth:sanctum');
Route::post('update',[IrbSubFormController::class, 'update'])->middleware('auth:sanctum');
Route::post('submit',[IrbSubFormController::class, 'submit'])->middleware('auth:sanctum');

