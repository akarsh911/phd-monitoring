<?php

namespace App\Services;

use Google_Client;
use Google_Service_Calendar;

class GoogleClientService
{
    public function getClient(): Google_Client
    {
        $client = new Google_Client();
        $client->setClientId(env('GOOGLE_CLIENT_ID'));
        $client->setClientSecret(env('GOOGLE_CLIENT_SECRET'));
        $client->setRedirectUri(env('GOOGLE_REDIRECT_URI')); // Set in .env
        $client->setAccessType('offline');
        $client->setScopes(Google_Service_Calendar::CALENDAR);

        // Load token from file
        $tokenPath = storage_path('app/google-token.json');
        if (!file_exists($tokenPath)) {
            throw new \Exception('Google token not found.');
        }

        $accessToken = json_decode(file_get_contents($tokenPath), true);
        $client->setAccessToken($accessToken);

        // Refresh if expired
        if ($client->isAccessTokenExpired()) {
            $client->fetchAccessTokenWithRefreshToken($client->getRefreshToken());
            file_put_contents($tokenPath, json_encode($client->getAccessToken()));
        }

        return $client;
    }
}
