<?php

use App\Http\Controllers\SupervisorAllocationController;
use App\Models\IrbSupervisorApproval;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('', [SupervisorAllocationController::class, 'listForms']);
    // Route::post('', [IrbSupervisorApproval::class, 'createForm']);
    Route::get('/form', [SupervisorAllocationController::class, 'loadForm'])->name('form.load');
    Route::get('/form/{form_id}', [SupervisorAllocationController::class, 'loadForm'])->name('form.load');
    Route::post('/form/{form_id}', [SupervisorAllocationController::class, 'submit'])->name('form.submit');
});