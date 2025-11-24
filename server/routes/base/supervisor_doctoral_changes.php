<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SupervisorDoctoralChangeController;

Route::middleware('auth:sanctum')->group(function () {
    // For HOD/PhD Coordinator to propose changes
    Route::post('/propose', [SupervisorDoctoralChangeController::class, 'proposeChange']);
    
    // For DORDC to view all pending changes
    Route::get('/pending', [SupervisorDoctoralChangeController::class, 'listPendingChanges']);
    
    // For viewing pending changes for a specific student
    Route::get('/student/{studentId}/pending', [SupervisorDoctoralChangeController::class, 'getStudentPendingChanges']);
    
    // For DORDC to approve/reject changes
    Route::put('/approve/{changeId}', [SupervisorDoctoralChangeController::class, 'approveChange']);
    Route::put('/reject/{changeId}', [SupervisorDoctoralChangeController::class, 'rejectChange']);
});
