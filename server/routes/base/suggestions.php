<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SuggestionController;


Route::middleware('auth:sanctum')->group(function () {
    Route::post('specialization',[SuggestionController::class, 'suggestSpecialization']);
    Route::post('faculty', [SuggestionController::class, 'suggestFaculty']);
    Route::post('outside-expert', [SuggestionController::class, 'suggestOutsideExpert']);
    Route::post('country', [SuggestionController::class, 'suggestCountry']);
    Route::post('state', [SuggestionController::class, 'suggestState']);
    Route::post('city', [SuggestionController::class, 'suggestCity']);
});
