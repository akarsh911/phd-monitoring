<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ListOfExaminersForm extends Model
{
    use HasFactory;

    protected $table = 'list_of_examiners_forms';

    protected $fillable = [
        'student_id',
        'supervisor_id',
        'status',
        'stage',
        'dordc_approval',
        'director_approval',
        'supervisor_lock',
        'dordc_lock',
        'director_lock',
        'SuperVisorComments',
        'DORDCComments',
        'DirectorComments'
    ];

    public function fullForm($user)
    {
        return [
            'form_id' => $this->id,
            'name' => $this->student->user->name(),
            'roll_no' => $this->student->roll_no,
            'date_of_registration' => $this->student->date_of_registration,
            'phd_title' => $this->student->phd_title,
            'role' => $user->current_role->role,
            'supervisors' => $this->student->supervisors->map(function ($supervisor) {
                return [
                    'name' => $supervisor->user->name(),
                    'designation' => $supervisor->designation,
                    'department' => $supervisor->department->name,
                    'phone' => $supervisor->user->phone,
                ];
            }),
            'status' => $this->status,
            'stage' => $this->stage,
            'SuperVisorComments' => $this->SuperVisorComments,
           'DORDCComments' => $this->DORDCComments,
            'DirectorComments' => $this->DRAComments,
           
            'examiners' => $this->recommendations,

            'supervisor_lock' => $this->supervisor_lock,
            'dordc_lock' => $this->dordc_lock,
            'director_lock' => $this->director_lock,
        ];
    }

    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id', 'roll_no');
    }

    public function supervisor()
    {
        return $this->belongsTo(Faculty::class, 'supervisor_id', 'faculty_code');
    }

    public function recommendations()
    {
        return $this->hasMany(ListOfExaminersRecommendation::class, 'form_id');
    }
}
