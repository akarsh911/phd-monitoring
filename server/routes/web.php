<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::post('/about', function () {
    return "<html><body><h1>About Us</h1><p>This is about us page</p></body></html>";
});