<?php

use App\Http\Controllers\ThesisExtentionController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->group(function () {
    Route::get('', [ThesisExtentionController::class, 'listForm']);
    Route::post('', [ThesisExtentionController::class, 'createForm']);
    Route::post('/bulk', [ThesisExtentionController::class, 'bulkSubmit'])->name('form.bulk.create');
    Route::get('/{form_id}', [ThesisExtentionController::class, 'loadForm'])->name('form.load');
    Route::post('/{form_id}', [ThesisExtentionController::class, 'submit'])->name('form.submit');
});
