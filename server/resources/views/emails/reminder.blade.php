<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Event Reminder</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .event-box {
            background-color: #f8f9fa;
            border-left: 4px solid #3490dc;
            padding: 15px;
            margin-bottom: 20px;
        }
        .event-title {
            color: #3490dc;
            margin-top: 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Reminder: {{ $event }}</h1>
        
        <div class="event-box">
            <h2 class="event-title">Event Details</h2>
            <p>{{ $details }}</p>
        </div>
        
        <p>Don't forget about this important event!</p>
        
        <p>Best regards,<br>The Team</p>
    </div>
</body>
</html>