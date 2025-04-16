<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;

class LogViewerController extends Controller
{
    public function fetchLogs(Request $request)
    {
        $loggenInUser = Auth::user();
        if($loggenInUser->current_role->role != 'admin'){
            return response()->json([
                'message' => 'You do not have permission to create supervisor'
            ], 403);
        }
        $filePath = storage_path('logs/laravel.log');
        $offset = intval($request->query('offset', 0));
        $direction = $request->query('direction', 'forward');
    
        if (!file_exists($filePath)) {
            return response()->json(['logs' => '', 'offset' => 0, 'size' => 0]);
        }
    
        $handle = fopen($filePath, 'r');
        $size = filesize($filePath);
    
        $chunkSize = 5000; // arbitrary chunk size
        $offset = max(0, min($offset, $size));
    
        if ($direction === 'backward') {
            // Read previous chunk
            $readStart = max(0, $offset - $chunkSize);
            $readLength = $offset - $readStart;
    
            if ($readLength <= 0) {
                fclose($handle);
                return response()->json(['logs' => '', 'offset' => 0, 'size' => $size]);
            }
    
            fseek($handle, $readStart);
            $logs = fread($handle, $readLength);
    
            return response()->json([
                'logs' => $logs,
                'offset' => $readStart,
                'size' => $size,
            ]);
        } else {
            // Read next chunk
            $readLength = min($chunkSize, $size - $offset);
    
            if ($readLength <= 0) {
                fclose($handle);
                return response()->json(['logs' => '', 'offset' => $offset, 'size' => $size]);
            }
    
            fseek($handle, $offset);
            $logs = fread($handle, $readLength);
    
            return response()->json([
                'logs' => $logs,
                'offset' => $offset + $readLength,
                'size' => $size,
            ]);
        }
    }
    
    
}
