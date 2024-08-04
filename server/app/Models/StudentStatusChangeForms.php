<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentStatusChangeForms extends Model
{
    use HasFactory;

    protected $table = 'student_status_change_forms';

    protected $fillable = [
        'student_id',
        'status',
        'stage',
        'reason',
        'supervisor_approval',
        'hod_approval',
        'dra_approval',
        'dordc_approval',
        'director_approval',
        'student_lock',
        'supervisor_lock',
        'hod_lock',
        'dordc_lock',
        'dra_lock',
        'director_lock',
        'SupervisorComments',
        'HODComments',
        'DORDCComments',
        'DRAComments',
        'DirectorComments'
    ];

    /**
     * Get the student associated with the status change form.
     * 
     */
    public function fullForm($user)
    {
        return [
            'name'=> $this->student->user->name(),
            'roll_no' => $this->student->roll_no,
            'department' => $this->student->department->name,
            'date_of_registration' => $this->student->date_of_registration,
            'phd_title' => $this->student->phd_title,
            'email' => $this->student->user->email,
            'phone' => $this->student->user->phone,
            'status_change_history'=>$this->student->statusChanges,
            'type_of_change'=>$this->student->current_status=="full-time"?"part-time":"full-time",
            'date_of_irb' => $this->student->date_of_irb,
            'reason' => $this->reason,
            'supervisor_approval' => $this->supervisor_approval,
            'hod_approval' => $this->hod_approval,
            'dra_approval' => $this->dra_approval,
            'dordc_approval' => $this->dordc_approval,
            'director_approval' => $this->director_approval,
            'student_lock' => $this->student_lock,
            'hod_lock' => $this->hod_lock,
            'dordc_lock' => $this->dordc_lock,
            'dra_lock' => $this->dra_lock,
            'director_lock' => $this->director_lock,
            'SupervisorComments' => $this->SupervisorComments,
            'HODComments' => $this->HODComments,
            'DORDCComments' => $this->DORDCComments,
            'DRAComments' => $this->DRAComments,
            'DirectorComments' => $this->DirectorComments

        ];
    }

    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id', 'roll_no');
    }

    /**
     * Set the default values for attributes.
     */
    protected $attributes = [
        'student_lock' => false,
        'supervisor_lock' => true,
        'hod_lock' => true,
        'dordc_lock' => true,
        'dra_lock' => true,
        'director_lock' => true,
    ];
}
