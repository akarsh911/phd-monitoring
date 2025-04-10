<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SupervisorController;


Route::get('/assign', [SupervisorController::class, 'showAssignForm']); 
Route::middleware('auth:sanctum')->group(function () {
  Route::post('/allot-supervisor', [SupervisorController::class, 'assign']);
   Route::post('/allot-doctoral', [SupervisorController::class, 'assignDoctoral']);
});