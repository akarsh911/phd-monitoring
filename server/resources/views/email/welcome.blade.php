<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Welcome to Our Platform</title>
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
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #3490dc;
            color: white;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome, {{ $name }}!</h1>
        
        <p>Thank you for joining our platform. We're excited to have you!</p>
        
        <p>To activate your account, please click the button below:</p>
        
        <p>
            <a href="{{ $activationLink }}" class="button">Activate Account</a>
        </p>
        
        <p>If you have any questions, feel free to contact our support team.</p>
        
        <p>Best regards,<br>The Team</p>
    </div>
</body>
</html>