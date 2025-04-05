<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Services\GoogleClientService; 
use Google_Service_Calendar;

class GoogleCalendarController extends Controller
{
    public function getGoogleAuthUrl()
    {
        $client = new \Google_Client();
        $client->setClientId(env('GOOGLE_CLIENT_ID'));
        $client->setClientSecret(env('GOOGLE_CLIENT_SECRET'));
        $client->setRedirectUri(env('GOOGLE_REDIRECT_URI'));
        $client->addScope(Google_Service_Calendar::CALENDAR);
        $client->setAccessType('offline');
        $client->setPrompt('consent');

        return response()->json([
            'auth_url' => $client->createAuthUrl()
        ]);
    }

    public function handleGoogleCallback(Request $request)
    {
        $client = new \Google_Client();
        $client->setClientId(env('GOOGLE_CLIENT_ID'));
        $client->setClientSecret(env('GOOGLE_CLIENT_SECRET'));
        $client->setRedirectUri(env('GOOGLE_REDIRECT_URI'));

        $token = $client->fetchAccessTokenWithAuthCode($request->code);

        if (isset($token['error'])) {
            return response()->json(['error' => $token['error']], 400);
        }

        Storage::put('google-token.json', json_encode($token));

        return response()->json(['message' => 'Token saved']);
    }

    public function createCalendarEvent(Request $request, GoogleClientService $googleService)
    {
        $client = $googleService->getClient(); // use service
        $service = new Google_Service_Calendar($client);

        $event = new \Google_Service_Calendar_Event([
            'summary' => $request->summary,
            'start' => [
                'dateTime' => $request->start,
                'timeZone' => 'Asia/Kolkata',
            ],
            'end' => [
                'dateTime' => $request->end,
                'timeZone' => 'Asia/Kolkata',
            ],
            'attendees' => array_map(function ($email, $index) {
                return [
                    'email' => $email,
                    'optional' => false,
                    'organizer' => $index === 0 // only first is organizer
                ];
            }, $request->participants, array_keys($request->participants)),
            'conferenceData' => [
                'createRequest' => [
                    'requestId' => uniqid(),
                    'conferenceSolutionKey' => ['type' => 'hangoutsMeet'],
                ],
            ],
        ]);

        $createdEvent = $service->events->insert('primary', $event, [
            'conferenceDataVersion' => 1,
            'sendUpdates' => 'all',
        ]);

        return response()->json([
            'event_link' => $createdEvent->htmlLink,
            'meet_link' => optional($createdEvent->getConferenceData()->getEntryPoints())[0]->uri ?? null
        ]);
    }
}
