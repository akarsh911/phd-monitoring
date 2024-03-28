<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PresentationPanel extends Model
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
     * Get the presentation associated with the panel.
     */
    public function presentation()
    {
        return $this->belongsTo(Presentation::class);
    }

    /**
     * Get the faculty associated with the panel.
     */
    public function faculty()
    {
        return $this->belongsTo(Faculty::class);
    }
}
