<?php
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\SupervisorController;

Route::get('',function (Request $request){
    $supervisors = \App\Models\Supervisor::all();
    
    return response()->json($supervisors,200);
});

Route::post('/assign', [SupervisorController::class, 'assign'])->middleware('auth:sanctum');