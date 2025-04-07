<?php

use App\Http\Controllers\SynopsisSubmissionController;
use Illuminate\Support\Facades\Route;



Route::middleware('auth:sanctum')->group(function () {
    Route::get('', [SynopsisSubmissionController::class, 'listForm']);
    Route::post('', [SynopsisSubmissionController::class, 'createForm']);
    Route::post('/bulk', [SynopsisSubmissionController::class, 'bulkSubmit'])->name('form.bulk.create');
    Route::get('/filters', [SynopsisSubmissionController::class, 'listFilters']);
    Route::post('/{form_id}/link', [SynopsisSubmissionController::class, 'linkPublication'])->name('form.load');
    Route::post('/{form_id}/unlink', [SynopsisSubmissionController::class, 'unlinkPublication'])->name('form.load');

    Route::get('/{form_id}', [SynopsisSubmissionController::class, 'loadForm'])->name('form.load');
    Route::post('/{form_id}', [SynopsisSubmissionController::class, 'submit'])->name('form.submit');
});
