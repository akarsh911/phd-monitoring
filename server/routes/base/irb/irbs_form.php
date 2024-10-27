<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IrbSubController;


Route::middleware('auth:sanctum')->group(function () {
    Route::get('', [IrbSubController::class, 'listForm']);
    Route::post('', [IrbSubController::class, 'createForm']);
    Route::get('/{form_id}', [IrbSubController::class, 'loadForm'])->name('form.load');
    Route::post('/{form_id}', [IrbSubController::class, 'submit'])->name('form.submit');
});
