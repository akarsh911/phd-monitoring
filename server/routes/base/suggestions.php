<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SuggestionController;


Route::middleware('auth:sanctum')->group(function () {
    Route::post('specialization',[SuggestionController::class, 'suggestSpecialization']);
    Route::post('faculty', [SuggestionController::class, 'suggestFaculty']);
});
