<?php
namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Config;

class WelcomeResetPassword extends Notification
{
    protected $token;
    protected $user;

    public function __construct($token, $user)
    {
        $this->token = $token;
        $this->user = $user;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    protected function resetUrl()
    {
        return url(config('app.frontend_url') . '/reset-password?token=' . $this->token . '&email=' . urlencode($this->user->email));
       
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Welcome to PhD Portal – Reset Your Password')
            ->view('emails.welcome_reset', [
                'user' => $this->user,
                'resetUrl' => $this->resetUrl(),
            ]);
    }
}
