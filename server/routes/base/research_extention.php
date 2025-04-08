<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ResearchExtentionController;


Route::middleware('auth:sanctum')->group(function () {
    Route::get('', [ResearchExtentionController::class, 'listForm']);
    Route::post('', [ResearchExtentionController::class, 'createForm']);
    Route::post('/bulk', [ResearchExtentionController::class, 'bulkSubmit'])->name('form.bulk.create');
    Route::get('/filters', [ResearchExtentionController::class, 'listFilters']);
    Route::get('/{form_id}', [ResearchExtentionController::class, 'loadForm'])->name('form.load');
    Route::post('/{form_id}', [ResearchExtentionController::class, 'submit'])->name('form.submit');
});
