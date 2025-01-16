<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExaminersRecommendation extends Model
{
    use HasFactory;

    // The table associated with the model
    protected $table = 'examiners_recommendation';

    // The primary key associated with the table
    protected $primaryKey = 'id';

    // Indicates if the IDs are auto-incrementing
    public $incrementing = true;

    // The attributes that are mass assignable
    protected $fillable = [
        'form_id',
        'name',
        'email',
        'institution',
        'designation',
        'department',
        'phone',
        'type',
        'comment',
        'faculty_id',
        'recommendation',
    ];

    // The attributes that should be cast to native types
    protected $casts = [
        'recommendation' => 'string',
    ];

    public function listOfExaminers()
    {
        return $this->belongsTo(ListOfExaminers::class, 'form_id', 'id');
    }

    public function faculty()
    {
        return $this->belongsTo(Faculty::class, 'faculty_id', 'faculty_code');
    }
}
