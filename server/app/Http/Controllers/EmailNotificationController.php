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
        $userEmail = "akarsh91140@gmail.com";
        $userName = "Abhinav";
        try {
            $pdfPath = storage_path('/app/public/uploads/irb_sub_rev//irb_sub_rev_100003570_202504040238399491.pdf');

            $success = $this->emailService->sendEmail(
                $userEmail,
                'approval',  // Use the Blade template 'emails/approval.blade.php'
                [
                    'user' => [
                        'name' => $userName,
                        'email' => $userEmail,
                    ],
                    'name' => $userName,
                    'email' => $userEmail,
                    'approverName' => "Dr. Tarunpreet Bhatia",
                    'formId' => 2,
                    'approvalKey' => 'fe6160cde4d63d587ca56e71f24ff5c4014531c1cea0d858ab71e9402e7dcca0',
                ],
                false,                               // Scheduled email
                '2025-04-01 11:13:00',             // Set desired schedule time
                "IRB Submission Approval Request" ,
                [$pdfPath]
            );
        
            if ($success) {
                return response()->json(['success' => true, 'message' => 'Approval email sent successfully.']);
            } else {
                return response()->json(['success' => false, 'message' => 'Failed to send approval email.']);
            }

        if ($success) {
            return response()->json(['success' => true, 'message' => 'Email sent successfully.']);
        } else {
            return response()->json(['success' => false, 'message' => 'Failed to send email.']);
        }
    }
        catch (\Exception $e) {
            // If there is an error, return the error message
            return response()->json(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
        }
        
        // return response()->json(['success' => $success]);
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