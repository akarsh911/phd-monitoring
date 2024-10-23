<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SuggestionController;


Route::middleware('auth:sanctum')->group(function () {
    Route::get('specialization',[SuggestionController::class, 'suggestSpecialization']);
    Route::get('faculty', [SuggestionController::class, 'suggestFaculty']);
});
