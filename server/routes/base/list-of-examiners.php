<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ListOfExaminersController;


Route::middleware('auth:sanctum')->group(function () {
    Route::get('', [ListOfExaminersController::class, 'listForm']);
    Route::post('', [ListOfExaminersController::class, 'createForm']);
    Route::post('/bulk', [ListOfExaminersController::class, 'bulkSubmit'])->name('form.bulk.create');
    Route::get('/{form_id}', [ListOfExaminersController::class, 'loadForm'])->name('form.load');
    Route::post('/{form_id}', [ListOfExaminersController::class, 'submit'])->name('form.submit');
});
