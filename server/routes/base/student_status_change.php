<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentStatusChangeFormsController;

Route::post('',[StudentStatusChangeFormsController::class, 'loadForm'])->middleware('auth:sanctum');
Route::post('submit',[StudentStatusChangeFormsController::class, 'submitForm'])->middleware('auth:sanctum');

