<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ResearchExtentionsController;

Route::post('',[ResearchExtentionsController::class, 'loadForm'])->middleware('auth:sanctum');
Route::post('update',[ResearchExtentionsController::class, 'approve'])->middleware('auth:sanctum');
Route::post('submit',[ResearchExtentionsController::class, 'submit'])->middleware('auth:sanctum');

