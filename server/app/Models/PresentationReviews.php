<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PresentationReview extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'presentation_id',
        'faculty_id',
        'progress',
        'comments',
        'review_status',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'progress' => 'string',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    /**
     * Get the presentation associated with the review.
     */
    public function presentation()
    {
        return $this->belongsTo(Presentation::class);
    }

    /**
     * Get the faculty associated with the review.
     */
    public function faculty()
    {
        return $this->belongsTo(Faculty::class);
    }
}
