<?php
namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Password;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\Log;
use App\Models\User;
use App\Notifications\WelcomeResetPassword;

class ProcessBulkForgotPassword implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $emails;

    public function __construct(array $emails)
    {
        $this->emails = $emails;
    }

    public function handle()
    {
        foreach ($this->emails as $email) {
            $user = User::where('email', $email)->first();

            if (!$user) {
                Log::info("User not found: $email");
                continue;
            }

            $token = Password::broker()->createToken($user);
            $user->notify(new WelcomeResetPassword($token, $user));
            Log::info("Reset link sent to: $email");
        }
    }
}
