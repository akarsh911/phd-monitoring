<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class TemplatedEmail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * The template to use for the email.
     */
    public string $templateName;

    /**
     * The data to pass to the view.
     */
    public  $viewData =[];

    /**
     * Create a new message instance.
     */
    public function __construct(string $templateName, array $viewData = [], ?string $subject = null)
    {
        $this->templateName = $templateName;
        $this->viewData = $viewData;
        
        if ($subject) {
            $this->subject($subject);
        } else {
            // You could set a default subject based on template if desired
            $this->subject('New Notification');
        }
    }

    /**
     * Build the message.
     */
    public function build()
    {
        return $this->view("emails.{$this->templateName}")
                    ->with($this->viewData);
    }
}