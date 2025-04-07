<?php

use Illuminate\Support\Facades\Route;

use Illuminate\Http\Request;
Route::get('/', function () {
    return view('welcome');
});

Route::get('/reset-password/{token}', function (Request $request, $token) {
    return view('auth.reset-password', ['token' => $token, 'email' => $request->email]);
})->name('password.reset');

Route::get('/reset-password/{token}', function ($token) {
    return redirect("/reset-password?token=$token");
});