<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupervisorAllocation extends Model
{
    use HasFactory;

    protected $table = 'supervisor_allocations';

    protected $fillable = [
        'student_id',
        'status',
        'stage',
        'requires_period',
        'reason',
        'hod_approval',
        'student_lock',
        'HODComments',
        'prefrence1',
        'prefrence2',
        'prefrence3',
        'prefrence4',
        'prefrence5'
    ];

    // Define relationships
    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id', 'roll_no');
    }

    public function faculty1()
    {
        return $this->belongsTo(Faculty::class, 'prefrence1', 'faculty_code');
    }

    public function faculty2()
    {
        return $this->belongsTo(Faculty::class, 'prefrence2', 'faculty_code');
    }

    public function faculty3()
    {
        return $this->belongsTo(Faculty::class, 'prefrence3', 'faculty_code');
    }

    public function faculty4()
    {
        return $this->belongsTo(Faculty::class, 'prefrence4', 'faculty_code');
    }

    public function faculty5()
    {
        return $this->belongsTo(Faculty::class, 'prefrence5', 'faculty_code');
    }

    // Function to return array of preferences
    public function getPreferencesArray()
    {
        return [
            'prefrence1' => $this->prefrence1,
            'prefrence2' => $this->prefrence2,
            'prefrence3' => $this->prefrence3,
            'prefrence4' => $this->prefrence4,
            'prefrence5' => $this->prefrence5,
        ];
    }
}
