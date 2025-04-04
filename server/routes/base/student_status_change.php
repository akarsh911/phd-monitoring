<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StatusChangeFormController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('', [StatusChangeFormController::class, 'listForm']);
    Route::post('', [StatusChangeFormController::class, 'createForm']);
    Route::post('/bulk', [StatusChangeFormController::class, 'bulkSubmit'])->name('form.bulk.create');
    Route::get('/{form_id}', [StatusChangeFormController::class, 'loadForm'])->name('form.load');
    Route::post('/{form_id}', [StatusChangeFormController::class, 'submit'])->name('form.submit');
});
