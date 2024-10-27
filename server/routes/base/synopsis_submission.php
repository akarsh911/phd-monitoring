<?php

use App\Http\Controllers\SynopsisSubmissionController;
use Illuminate\Support\Facades\Route;



Route::middleware('auth:sanctum')->group(function () {
    Route::get('', [SynopsisSubmissionController::class, 'listForm']);
    Route::post('', [SynopsisSubmissionController::class, 'createForm']);

    Route::get('/{form_id}', [SynopsisSubmissionController::class, 'loadForm'])->name('form.load');
    Route::post('/{form_id}', [SynopsisSubmissionController::class, 'submit'])->name('form.submit');
});
