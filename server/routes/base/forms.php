<?php


use Illuminate\Support\Facades\Route;


Route::prefix('irb/constitutuion')->group(function () {
    require base_path('routes/base/irb/irbc_form.php');
});

Route::prefix('irb/submission')->group(function () {
    require base_path('routes/base/irb/irbs_form.php');
});

Route::prefix('research/extension')->group(function () {
    require base_path('routes/base/research_extention.php');
});

Route::prefix('supervisor/change')->group(function () {
    require base_path('routes/base/supervisor_change.php');
});

Route::prefix('supervisor/allocation')->group(function () {
    require base_path('routes/base/supervisor_allocation.php');
});

Route::prefix('status-change')->group(function () {
    require base_path('routes/base/student_status_change.php');
});