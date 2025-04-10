<?php

use App\Http\Controllers\SemesterController;
// use App\Http\Controllers\StudentSemesterOffFormController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/recent', [SemesterController::class, 'getRecent']);
    Route::get('/{semester_id}', [SemesterController::class, 'getRecent']);
    Route::post('', [SemesterController::class, 'create']);
  });
