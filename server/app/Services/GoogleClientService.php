<?php

namespace App\Services;

use Google_Client;
use Google_Service_Calendar;
use Illuminate\Support\Facades\Storage;

class GoogleClientService
{
    public function getClient()
    {
        $client = new Google_Client();
        $client->setApplicationName('PhD Presentation Scheduler');
        $client->setClientId(env('GOOGLE_CLIENT_ID'));
        $client->setClientSecret(env('GOOGLE_CLIENT_SECRET'));
        $client->setRedirectUri(env('GOOGLE_REDIRECT_URI'));
        $client->setAccessType('offline');
        $client->setScopes([\Google_Service_Calendar::CALENDAR]);

        // Load previously authorized token from storage.
        if (Storage::exists('google-token.json')) {
            $accessToken = json_decode(Storage::get('google-token.json'), true);
            $client->setAccessToken($accessToken);

            // Refresh the token if it's expired
            if ($client->isAccessTokenExpired()) {
                if ($client->getRefreshToken()) {
                    $client->fetchAccessTokenWithRefreshToken($client->getRefreshToken());
                    Storage::put('google-token.json', json_encode($client->getAccessToken()));
                }
            }
        }

        return $client;
    }
}
