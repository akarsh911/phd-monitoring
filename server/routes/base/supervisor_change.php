<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SupervisorChangeFormController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('', [SupervisorChangeFormController::class, 'listForms']);
    // Route::post('', [IrbSupervisorApproval::class, 'createForm']);
    Route::get('/form', [SupervisorChangeFormController::class, 'loadForm'])->name('form.load');
    Route::get('/form/{form_id}', [SupervisorChangeFormController::class, 'loadForm'])->name('form.load');
    Route::post('/form/{form_id}', [SupervisorChangeFormController::class, 'submit'])->name('form.submit');
});