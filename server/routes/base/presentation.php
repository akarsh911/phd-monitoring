<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PresentationController;


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/filters', [PresentationController::class, 'listFilters']);
    Route::get('', [PresentationController::class, 'listForm']);
    Route::post('/bulk', [PresentationController::class, 'bulkSubmit']);
    Route::post('', [PresentationController::class, 'createForm']);
    Route::post('/bulk-schedule', [PresentationController::class, 'createMultipleForm']);
    Route::get('/form', [PresentationController::class, 'listForm']);
    Route::get('/form/filters', [PresentationController::class, 'listFilters']);
    Route::post('/{form_id}/link', [PresentationController::class, 'linkPublication']);
    Route::post('/{form_id}/unlink', [PresentationController::class, 'unlinkPublication']);
    Route::get('/{form_id}', [PresentationController::class, 'loadForm']);
    Route::post('/{form_id}', [PresentationController::class, 'submit']);
    Route::post('/form/{form_id}/link', [PresentationController::class, 'linkPublication']);
    Route::post('/form/{form_id}/unlink', [PresentationController::class, 'unlinkPublication']);
    Route::get('/form/{form_id}', [PresentationController::class, 'loadForm']);
    Route::post('/form/{form_id}', [PresentationController::class, 'submit']);
});
