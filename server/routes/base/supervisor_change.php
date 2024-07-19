<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SupervisorChangeFormController;

Route::post('',[SupervisorChangeFormController::class, 'loadForm'])->middleware('auth:sanctum');
Route::post('submit',[SupervisorChangeFormController::class, 'submitForm'])->middleware('auth:sanctum');

