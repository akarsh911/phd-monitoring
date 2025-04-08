<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentSemesterOff extends Model
{
    use HasFactory;

    protected $table = 'student_semester_offs';

    protected $fillable = [
        'semester_off_id',
        'student_id',
        'semester_off_required',
        'proof_pdf',
        'reason',
        'semester_id'
    ];

    /**
     * Get the semester off form associated with this entry.
     */
    public function semesterOffForm()
    {
        return $this->belongsTo(StudentSemesterOffForm::class, 'semester_off_id');
    }

    /**
     * Get the student associated with this entry.
     */
    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id', 'roll_no');
    }
}
