<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PresentationController;

Route::middleware('auth:sanctum')->group(function () {
    
    // Filters
    Route::get('/filters', [PresentationController::class, 'listFilters']);
    Route::get('/form/filters', [PresentationController::class, 'listFilters']);
    Route::get('/semester/{semester_id}/filters', [PresentationController::class, 'listFilters']);

    // Bulk Scheduling
    Route::post('/form/bulk-schedule', [PresentationController::class, 'createMultipleForm']);
    Route::get('/form/bulk-schedule', [PresentationController::class, 'createMultipleForm']);

    // Form Listing & Creation
    Route::get('/form', [PresentationController::class, 'listForm']);
    Route::post('/form', [PresentationController::class, 'createForm']);

    // Form with ID (view, submit, link/unlink)
    Route::get('/form/{form_id}', [PresentationController::class, 'loadForm']);
    Route::post('/form/{form_id}', [PresentationController::class, 'submit']);
    Route::post('/form/{form_id}/link', [PresentationController::class, 'linkPublication']);
    Route::post('/form/{form_id}/unlink', [PresentationController::class, 'unlinkPublication']);

    // Bulk form submission
    Route::post('/form/bulk', [PresentationController::class, 'bulkSubmit']);

    // Semester-based form listing
    Route::get('/semester/{semester_id}', [PresentationController::class, 'listForm']);
});
