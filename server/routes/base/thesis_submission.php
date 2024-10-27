<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ThesisSubmissionController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('', [ThesisSubmissionController::class, 'listForm']);
    Route::post('', [ThesisSubmissionController::class, 'createForm']);
    Route::get('/{form_id}', [ThesisSubmissionController::class, 'loadForm'])->name('form.load');
    Route::post('/{form_id}', [ThesisSubmissionController::class, 'submit'])->name('form.submit');
});
