<?php


use Illuminate\Support\Facades\Route;


Route::prefix('irb/constitutuion')->group(function () {
    require base_path('routes/base/irb/irbc_form.php');
});

Route::prefix('irb/submission')->group(function () {
    require base_path('routes/base/irb/irbs_form.php');
});

Route::prefix('thesis/submission')->group(function () {
    require base_path('routes/base/thesis_submission.php');
});

Route::prefix('thesis/extension')->group(function () {
    require base_path('routes/base/thesis_extention.php');
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
Route::prefix('synopsis-submission')->group(function () {
    require base_path('routes/base/synopsis_submission.php');
});

Route::prefix('semester-off')->group(function () {
    require base_path('routes/base/semester_off.php');
});