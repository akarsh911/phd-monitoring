<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Approval Request</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
            padding: 20px;
        }
        .email-container {
            max-width: 600px;
            margin: auto;
            padding: 20px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            padding-bottom: 10px;
            border-bottom: 1px solid #ddd;
        }
        .button {
            padding: 10px 20px;
            margin: 10px;
            border-radius: 5px;
            color: white;
            text-decoration: none;
            display: inline-block;
        }
        .approve {
            background-color: #4CAF50;
        }
        .reject {
            background-color: #FF5733;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h2>IRB Submission Approval Request</h2>
            <p><strong>Submitted By:</strong> {{ $user->name }} ({{ $user->email }})</p>
            <p><strong>Form ID:</strong> {{ $formId }}</p>
        </div>

        <p>Dear {{ $approverName }},</p>
        <p>The following IRB submission requires your approval. Please review the submission and choose one of the options below:</p>
        <p>Please Find the IRB PDF attached</p>
        <div style="text-align: center;">
            <a href="{{ url('/approval/approve/' . $formId . '?email=' . $user->email . '&token=' . $approvalKey) }}" class="button approve">Approve</a>
            <a href="{{ url('/approval/reject/' . $formId . '?email=' . $user->email . '&token=' . $approvalKey) }}" class="button reject">Reject</a>
        </div>

        <p>Thank you,<br>
        Thapar Institute - IRB Coordination Team</p>
    </div>
</body>
</html>
