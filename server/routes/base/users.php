<?php

use App\Http\Controllers\UserManagementController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/', [UserManagementController::class, 'list']);
    Route::get('/filters', [UserManagementController::class, 'listFilters']);
    Route::post('/', [UserManagementController::class, 'createOrUpdate']);
    Route::get('/{id}', [UserManagementController::class, 'show']);
    Route::delete('/{id}', [UserManagementController::class, 'delete']);
    Route::post('/bulk-import', [UserManagementController::class, 'bulkImport']);
    Route::post('/{id}/reset-password', [UserManagementController::class, 'resetPassword']);
    Route::post('/{id}/send-reset-email', [UserManagementController::class, 'sendResetEmail']);
});
