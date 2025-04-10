<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Welcome Email</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5eaea;
            padding: 40px 20px;
            color: #333;
            margin: 0;
        }
        .email-container {
            background-color: #ffffff;
            border-radius: 10px;
            padding: 30px 40px;
            max-width: 600px;
            margin: auto;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        }
        .logo {
            text-align: center;
            margin-bottom: 25px;
        }
        .logo img {
            max-height: 120px;
        }
        h2 {
            font-size: 24px;
            color: #2c3e50;
            margin-bottom: 15px;
        }
        p {
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 15px;
        }
        a {
            color: #792c2c;
            text-decoration: none;
        }
        .button {
            display: inline-block;
            background-color: #792c2c;
            color: #ffffff;
            padding: 14px 28px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
            margin-top: 20px;
            transition: background-color 0.3s ease;
        }
        .button:hover {
            background-color: #792c2c;
        }
        @media (max-width: 600px) {
            .email-container {
                padding: 20px;
            }
            h2 {
                font-size: 20px;
            }
            .button {
                padding: 12px 20px;
                font-size: 15px;
            }
        }
    </style>
</head>
<body>
<div class="email-container">
    <div class="logo">
        <img src="https://phdportal.thapar.edu/images/tiet_logo.png" alt="PhD Portal Logo">
    </div>
    <h2>Welcome {{ $user->name }},</h2>
    <p>You’ve been added to the <strong>PhD Coordination Portal</strong> at 
        <a href="https://phdportal.thapar.edu" target="_blank">phdportal.thapar.edu</a>.
    </p>

    <p>We’re excited to have you on board during our <strong>pilot testing phase</strong>. The portal is currently in beta, and your participation will help us refine and improve the experience for all users — faculty, students, and administrators alike.</p>

    <p>To get started, please set your password by clicking the button below. This link will remain valid for 24 hours.</p>

    <a href="{{ $resetUrl }}" class="button">Set Password</a>

    <p>If you didn’t expect this email, you can safely ignore it.</p>

    <p>Thank you for being part of this important phase.</p>

    <p>Best regards,<br>
    PhD Coordination Team<br>
    Thapar Institute of Engineering & Technology</p>
</div>
</body>
</html>
