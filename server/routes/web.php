<?php

use Illuminate\Support\Facades\Route;

use Illuminate\Http\Request;
Route::get('/', function () {
    return view('welcome');
});


Route::get('/reset-password/{token}', function ($token) {
    $url = env('FRONTEND_URL', 'http://localhost:3000') . "/reset-password?token=$token";
    return redirect($url);
})->name('password.reset');

Route::get('api/reset-password/{token}', function ($token) {
    $url = env('FRONTEND_URL', 'http://localhost:3000') . "/reset-password?token=$token";
    return redirect($url);
})->name('password.reset.redirect');
