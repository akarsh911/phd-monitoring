<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SupervisorChangeFormController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('', [SupervisorChangeFormController::class, 'listForm']);
    Route::post('', [SupervisorChangeFormController::class, 'createForm']);
    Route::post('/bulk', [SupervisorChangeFormController::class, 'bulkSubmit'])->name('form.bulk.create');
    Route::get('/{form_id}', [SupervisorChangeFormController::class, 'loadForm'])->name('form.load');
    Route::post('/{form_id}', [SupervisorChangeFormController::class, 'submit'])->name('form.submit');
});