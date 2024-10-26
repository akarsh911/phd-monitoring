<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SynopsisObjectives extends Model
{
    use HasFactory;

    protected $table = 'synopsis_objectives';

    protected $fillable = [
        'synopsis_id',
        'objective',
    ];

    /**
     * Define the relationship to the SynopsisSubmission.
     *
     * Each objective belongs to a specific synopsis submission.
     */
    public function synopsisSubmission()
    {
        return $this->belongsTo(SynopsisSubmission::class, 'synopsis_id');
    }
}
