<?php
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\IrbFormController;


Route::post('',[IrbFormController::class, 'loadForm'])->middleware('auth:sanctum');
Route::post('update',[IrbFormController::class, 'superVisorPrefs'])->middleware('auth:sanctum');
Route::post('submit',[IrbFormController::class, 'submit'])->middleware('auth:sanctum');

