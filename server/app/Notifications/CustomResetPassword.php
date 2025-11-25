<?php
namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class CustomResetPassword extends Notification
{
    protected $token;

    public function __construct($token)
    {
        $this->token = $token;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    protected function resetUrl($notifiable)
    {
        return url(config('app.frontend_url') . '/reset-password?token=' . $this->token . '&email=' . urlencode($notifiable->email));
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Reset Your Password - PhD Portal')
            ->view('emails.reset_password', [
                'user' => $notifiable,
                'resetUrl' => $this->resetUrl($notifiable),
            ]);
    }
}
