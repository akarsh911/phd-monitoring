<?php

use App\Http\Controllers\StudentSemesterOffFormController;
use Illuminate\Support\Facades\Route;

use App\Models\StudentSemesterOffForm;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('', [StudentSemesterOffFormController::class, 'listForm']);
    Route::post('', [StudentSemesterOffFormController::class, 'createForm']);
    Route::get('/{form_id}', [StudentSemesterOffFormController::class, 'loadForm'])->name('form.load');
    Route::post('/{form_id}', [StudentSemesterOffFormController::class, 'submit'])->name('form.submit');
});
