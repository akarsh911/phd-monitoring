<?php
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\FacultyController;
use Illuminate\Support\Facades\Auth;

Route::get('',[FacultyController::class, 'list'])->middleware('auth:sanctum');

Route::post('/add', [FacultyController::class, 'add'])->middleware('auth:sanctum');
Route::get('/upload-faculty', [FacultyController::class, 'showUploadForm'])->name('faculty.upload.form');
Route::post('/upload-faculty', [FacultyController::class, 'upload'])->name('faculty.upload');