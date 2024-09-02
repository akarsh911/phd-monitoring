<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExaminersDetail extends Model
{
    use HasFactory;

    protected $table = 'examiners_details';

    protected $fillable = [
        'name',
        'designation',
        'department',
        'email',
        'phone',
        'university',
        'country',
        'city',
        'added_by'
    ];

    public function addedBy()
    {
        return $this->belongsTo(Faculty::class, 'added_by', 'faculty_code');
    }

    public function recommendations()
    {
        return $this->hasMany(ListOfExaminersRecommendation::class, 'examiner_id');
    }
}
