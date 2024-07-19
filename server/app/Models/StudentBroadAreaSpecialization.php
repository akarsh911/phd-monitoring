<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentBroadAreaSpecialization extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'specialization_id'
    ];

    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id', 'roll_no');
    }

    public function specialization()
    {
        return $this->belongsTo(BroadAreaSpecialization::class, 'specialization_id');
    }
}
