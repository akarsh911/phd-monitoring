<?php

namespace App\Http\Controllers;

use App\Services\EmailService;
use Illuminate\Http\Request;

class EmailNotificationController extends Controller
{
    protected $emailService;
    
    public function __construct(EmailService $emailService)
    {
        $this->emailService = $emailService;
    }
    
    public function sendWelcomeEmail(Request $request)
    {
        $userEmail = $request->input('email');
        $userName = $request->input('name');
        
        // Example of immediate email
        $success = $this->emailService->sendEmail(
            $userEmail,
            'welcome',  // This would use emails/welcome.blade.php template
            [
                'name' => $userName,
                'activationLink' => url('/activate/' . md5($userEmail))
            ],
            false,  // Not scheduled
            null,   // No schedule time
            "Welcome to Our Platform, {$userName}!" // Custom subject
        );
        
        return response()->json(['success' => $success]);
    }
    
    public function scheduleReminder(Request $request)
    {
        // Example of scheduled email
        $success = $this->emailService->sendEmail(
            $request->input('email'),
            'reminder',
            [
                'event' => $request->input('event'),
                'details' => $request->input('details')
            ],
            true,  // Scheduled
            $request->input('send_at'), // Format: '2025-04-15 14:30:00'
            "Reminder: {$request->input('event')}"
        );
        
        return response()->json(['success' => $success]);
    }
}