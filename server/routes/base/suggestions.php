<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SuggestionController;

Route::post('specialization',[SuggestionController::class, 'suggestSpecialization'])->middleware('auth:sanctum');
