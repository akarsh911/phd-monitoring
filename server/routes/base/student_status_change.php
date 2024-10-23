<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StatusChangeFormController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('', [StatusChangeFormController::class, 'listForms']);
    Route::post('', [StatusChangeFormController::class, 'createForm']);
    Route::get('/form/{form_id}', [StatusChangeFormController::class, 'loadForm'])->name('form.load');
    Route::post('/form/{form_id}', [StatusChangeFormController::class, 'submit'])->name('form.submit');
});
