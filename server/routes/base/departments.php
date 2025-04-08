<?php
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\DepartmentController;
use Illuminate\Support\Facades\Auth;

Route::get('',[DepartmentController::class,'list'])->middleware('auth:sanctum');    
Route::post('/add', [DepartmentController::class, 'add'])->middleware('auth:sanctum');
Route::post('/specialization/add', [DepartmentController::class, 'addBroadAreaSpecialization'])->middleware('auth:sanctum');
Route::post('/phd_coordinator', [DepartmentController::class, 'addCoordinator'])->middleware('auth:sanctum');
Route::get('/filters', [DepartmentController::class, 'listFilters']);
