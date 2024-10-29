<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ParseRollNumber
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next)
    {
        // Retrieve the route parameters
        $routeParams = $request->route()->parameters;
        // Ensure you have the parameters needed
        if (isset($routeParams['form_id']) && isset($routeParams['id'])) {           
            $request->route()->setParameter('id', $routeParams['form_id']);
        }

        // Continue processing the request
        return $next($request);
    }
}
