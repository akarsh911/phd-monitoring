<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notifications extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'title',
        'body',
        'link',
        'is_read',
        'email_sent',
        'email_req',
        'role_id',
    ];

    /**
     * Get the user that owns the notification.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope a query to only include unread notifications.
     */
    public function scopeUnread($query)
    {
        return $query->where('is_read', false);
    }

    /**
     * Scope a query to only include notifications where the email was not sent.
     */
    public function scopeEmailNotSent($query)
    {
        return $query->where('email_sent', false)->where('email_req', true);
    }

    public function role()
    {
        return $this->belongsTo(Role::class, 'role_id');
    }
}
