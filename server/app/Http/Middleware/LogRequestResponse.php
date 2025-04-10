<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class LogRequestResponse
{
    public function handle(Request $request, Closure $next)
    {
        // Log the incoming request
        Log::info('📥 Incoming Request', [
            'method' => $request->method(),
            'url' => $request->fullUrl(),
            'ip' => $request->ip(),
            'headers' => $request->headers->all(),
            'body' => $request->all(),
        ]);

        // Handle the request and get the response
        $response = $next($request);

        // Log the outgoing response
        Log::info('📤 Outgoing Response', [
            'status' => $response->getStatusCode(),
            'content' => method_exists($response, 'getContent') ? json_decode($response->getContent(), true) : 'Non-JSON response',
        ]);

        return $response;
    }
}
