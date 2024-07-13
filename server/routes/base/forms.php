<?php


use Illuminate\Support\Facades\Route;


Route::prefix('irb/constitutuion')->group(function () {
    require base_path('routes/base/irb/irbc_form.php');
});

Route::prefix('irb/submission')->group(function () {
    require base_path('routes/base/irb/irbc_form.php');
});

Route::prefix('research/extension')->group(function () {
    require base_path('routes/base/research_extention.php');
});