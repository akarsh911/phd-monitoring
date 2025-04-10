<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AddApprovalFlag
{
    public function handle(Request $request, Closure $next)
    {
        // Only add if it's missing or a certain route is being hit
        if (!$request->has('approval')) {
            $request->merge([
                'approval' => true,
            ]);
        }

        return $next($request);
    }
}
