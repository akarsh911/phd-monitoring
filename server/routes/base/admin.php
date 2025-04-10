<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SupervisorController;
use Illuminate\Support\Facades\Password;
use App\Models\User;
use App\Notifications\WelcomeResetPassword;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

Route::get('/assign', [SupervisorController::class, 'showAssignForm']); 
Route::middleware('auth:sanctum')->group(function () {
  Route::post('/allot-supervisor', [SupervisorController::class, 'assign']);
   Route::post('/allot-doctoral', [SupervisorController::class, 'assignDoctoral']);

   
   Route::post('/bulk-forgot-password', function (Request $request) {
    $emails = $request->input('emails', []);
    
    Log::info('Incoming bulk emails: ', $emails);

    $results = [];

    foreach ($emails as $email) {
        $user = \App\Models\User::where('email', $email)->first();

        if (!$user) {
            $results[$email] = 'User not found';
            continue;
        }

        $token = Password::broker()->createToken($user);
        $user->notify(new \App\Notifications\WelcomeResetPassword($token, $user));

        $results[$email] = 'Reset link sent';
    }

    Log::info('Bulk reset results:', $results);

    return response()->json([
        'results' => $results,
    ]);
});
});