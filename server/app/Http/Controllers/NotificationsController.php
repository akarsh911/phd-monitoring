<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Traits\SaveFile;
use App\Models\Patent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class NotificationsController extends Controller
{
    public function unreadNotifications()
    {
        $user = Auth::user();
        $notifications = $user->notifications->where('is_read', false);
        $ret=[];
        foreach($notifications as $notification)
        {
            $ret[]=[
                'id'=>$notification->id,
                'title'=>$notification->title,
                'body'=>$notification->body,
                'link'=>$notification->link,
                'created_at'=>$notification->created_at,
                'role'=>$notification->role->role
            ];
        }
        return response()->json($ret);
    }

    public function markAsRead($id)
    {
        $user = Auth::user();
        $notification = $user->notifications->find($id);
        if ($notification) {
            $notification->is_read = true;
            $notification->save();
            return response()->json(['message' => 'Notification marked as read']);
        }
        return response()->json(['message' => 'Notification not found'], 404);
    }

    public function markAllAsRead()
    {
        $user = Auth::user();
        $notifications = $user->notifications->where('is_read', false)->get();
        foreach ($notifications as $notification) {
            $notification->is_read = true;
            $notification->save();
        }
        return response()->json(['message' => 'All notifications marked as read']);
    }

    public function deleteNotification($id)
    {
        $user = Auth::user();
        $notification = $user->notifications->find($id);
        if ($notification) {
            $notification->delete();
            return response()->json(['message' => 'Notification deleted']);
        }
        return response()->json(['message' => 'Notification not found'], 404);
    }

    public function allNotifications()
    {
        $user = Auth::user();
        $notifications = $user->notifications;
        $ret=[];
        foreach($notifications as $notification)
        {
            $ret[]=[
                'id'=>$notification->id,
                'id'=>$notification->id,
                'title'=>$notification->title,
                'body'=>$notification->body,
                'link'=>$notification->link,
                'is_read'=>$notification->is_read,
                'created_at'=>$notification->created_at,
                'role'=>$notification->role->role
            ];
        }
        return response()->json($ret);
    }
    
}