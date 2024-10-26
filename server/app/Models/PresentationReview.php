<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PresentationReview extends Model
{
    use HasFactory;

    // The table associated with the model
    protected $table = 'presentation_reviews';

    // The primary key associated with the table
    protected $primaryKey = 'id';

    // Indicates if the IDs are auto-incrementing
    public $incrementing = true;

    // The attributes that are mass assignable
    protected $fillable = [
        'presentation_id',
        'faculty_id',
        'progress',
        'is_supervisor',
        'comments',
        'review_status',
    ];

    // The attributes that should be cast to native types
    protected $casts = [
        'progress' => 'string',
        'review_status' => 'string',
    ];

    public function presentation()
    {
        return $this->belongsTo(Presentation::class, 'presentation_id', 'id');
    }

    public function faculty()
    {
        return $this->belongsTo(Faculty::class, 'faculty_id', 'faculty_code');
    }
}
