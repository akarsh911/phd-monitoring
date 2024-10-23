<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ResearchExtentionController;


Route::middleware('auth:sanctum')->group(function () {
    Route::get('', [ResearchExtentionController::class, 'listForm']);
    Route::post('', [ResearchExtentionController::class, 'createForm']);
    Route::get('/form', [ResearchExtentionController::class, 'loadForm'])->name('form.load');
    Route::get('/form/{form_id}', [ResearchExtentionController::class, 'loadForm'])->name('form.load');
    Route::post('/form/{form_id}', [ResearchExtentionController::class, 'submit'])->name('form.submit');
});
