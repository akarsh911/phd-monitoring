<?php

use App\Http\Controllers\OutsideExpertController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/list', [OutsideExpertController::class, 'list']);
    Route::get('/all', [OutsideExpertController::class, 'all']);
    Route::get('/filters', [OutsideExpertController::class, 'listFilters']);
    Route::post('/add', [OutsideExpertController::class, 'add']);
    Route::post('/bulk-import', [OutsideExpertController::class, 'bulkImportFromCSV']);
    Route::put('/update/{id}', [OutsideExpertController::class, 'update']);
    Route::delete('/delete/{id}', [OutsideExpertController::class, 'delete']);
});
