<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PresentationController;


Route::middleware('auth:sanctum')->group(function () {
    // Route::get('', [PresentationController::class, 'listForm']);
    // Route::post('', [PresentationController::class, 'createForm']);
    Route::get('/form', [PresentationController::class, 'loadForm'])->name('form.load');
    Route::get('/form/{form_id}', [PresentationController::class, 'loadForm'])->name('form.load');
    Route::post('/form/{form_id}', [PresentationController::class, 'submit'])->name('form.submit');
});
