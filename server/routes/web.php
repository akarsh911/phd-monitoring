<?php

use Illuminate\Support\Facades\Route;

use Illuminate\Http\Request;
Route::get('/', function () {
    return view('welcome');
});


Route::get('/reset-password/{token}', function ($token) {
    $url = env('FRONTEND_URL', 'https://phdportal.thapar.edu') . "/reset-password?token=$token";
    return redirect($url);
})->name('password.reset');

Route::get('api/reset-password/{token}', function ($token) {
    $url = env('FRONTEND_URL', 'https://phdportal.thapar.edu') . "/reset-password?token=$token";
    return redirect($url);
})->name('password.reset.redirect');
