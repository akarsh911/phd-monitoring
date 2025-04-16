<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class LogRequestResponse
{
    public function handle(Request $request, Closure $next)
    {
        // Skip logging sensitive routes or headers
        $sensitiveRoutes = [
            'api/admin/logs', 
            'api/notifications/unread' // Example route to skip logging
        ];
       
        $isSensitiveRequest = in_array($request->path(), $sensitiveRoutes);
        if (!$isSensitiveRequest) {
            // Log the incoming request (skip body and headers for sensitive ones)
            Log::info('📥 Incoming Request', [
                'method' => $request->method(),
                'url' => $request->fullUrl(),
                'ip' => $request->ip(),
                'headers' => $this->logHeaders($request->headers->all(), $isSensitiveRequest),
                'body' => $this->logBody($request->all(), $isSensitiveRequest),
            ]);
        }

        // Handle the request and get the response
        $response = $next($request);

        if (!$isSensitiveRequest) {
            Log::info('📤 Outgoing Response', [
                'status' => $response->getStatusCode(),
                'content' => $this->logResponseContent($response),
            ]);
        }

        return $response;
    }

    // Helper method to conditionally log headers
    private function logHeaders(array $headers, bool $isSensitiveRequest)
    {
        return $isSensitiveRequest ? 'Sensitive Data Skipped' : $headers;
    }

    // Helper method to conditionally log body
    private function logBody(array $body, bool $isSensitiveRequest)
    {
        return $isSensitiveRequest ? 'Sensitive Data Skipped' : $body;
    }

    // Helper method to conditionally log response content
    private function logResponseContent($response)
    {
        if (method_exists($response, 'getContent')) {
            $content = $response->getContent();
            return json_decode($content, true) ?? 'Non-JSON response';
        }

        return 'Non-JSON response';
    }
}
