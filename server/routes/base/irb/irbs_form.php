<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IrbSubController;


Route::middleware('auth:sanctum')->group(function () {
    Route::get('', [IrbSubController::class, 'listForms']);
    Route::post('', [IrbSubController::class, 'createForm']);
    Route::get('/form', [IrbSubController::class, 'loadForm'])->name('form.load');
    Route::get('/form/{form_id}', [IrbSubController::class, 'loadForm'])->name('form.load');
    Route::post('/form/{form_id}', [IrbSubController::class, 'submit'])->name('form.submit');
});
