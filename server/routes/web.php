<?php

use Illuminate\Support\Facades\Route;

use Illuminate\Http\Request;
Route::get('/', function () {
    return view('welcome');
});



Route::get('/reset-password/{token}', function ($token) {
    return redirect("/reset-password?token=$token");
})->name('password.reset');

Route::get('api/reset-password/{token}', function ($token) {
    return redirect("/reset-password?token=$token");
})->name('password.reset.redirect');