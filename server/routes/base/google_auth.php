<?php

use App\Http\Controllers\GoogleAuthController;
use Illuminate\Support\Facades\Route;

/**
 * Google OAuth Routes
 * These routes handle Google Sign-In authentication
 * No captcha required for Google authentication
 */

// Redirect to Google OAuth (for web-based flow)
Route::get('/redirect', [GoogleAuthController::class, 'redirectToGoogle']);

// Handle Google OAuth callback (for web-based flow)
Route::get('/callback', [GoogleAuthController::class, 'handleGoogleCallback']);

// Login with Google access token (for SPA/mobile apps)
// Client gets the token from Google and sends it to this endpoint
Route::post('/login', [GoogleAuthController::class, 'loginWithGoogleToken']);
