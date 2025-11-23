<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentCourse extends Model
{
    protected $table = 'student_courses';
    
    protected $fillable = [
        'student_id',
        'course_id',
        'status',
        'semester',
        'grade',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id', 'roll_no');
    }

    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id');
    }
}
