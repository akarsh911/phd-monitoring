<?php 

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RolesController;

Route::get('',function (Request $request){
    $roles = \App\Models\Role::all();
    return response()->json($roles,200);
});

Route::post('/add', [RolesController::class, 'add'])->middleware('auth:sanctum');