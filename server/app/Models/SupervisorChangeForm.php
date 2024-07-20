<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupervisorChangeForm extends Model
{
    use HasFactory;

    protected $table = 'supervisor_change_forms';

    protected $fillable = [
        'student_id',
        'status',
        'stage',
        'broader_area_of_research',
        'reason',
        'hod_approval',
        'dra_approval',
        'student_lock',
        'hod_lock',
        'dordc_lock',
        'dra_lock',
        'HODComments',
        'DORDCComments',
        'DRAComments'
    ];

    public function fullForm($user)
    {
        return [
            'form_id' => $this->id,
            'name' => $this->student->user->name(),
            'email' => $this->student->user->email,
            'roll_no' => $this->student->roll_no,
            'title_of_phd' => $this->student->phd_title,    
            'department' => $this->student->department->name,
            'phone' => $this->student->user->phone,
            'date_of_registration' => $this->student->date_of_registration,
            'irb_completed'=> $this->student->checkIrbCompletionStatus(),
            'date_of_supervisor_allocation' => $this->student->supervisor_update_date(),
            'broad_area_of_research' => $this->student->broad_area_specialization,
            'reason' => $this->reason,
            'supervisors' => $this->student->supervisors->map(function($supervisor){
                return [
                    'name' => $supervisor->user->name(),
                    'designation' => $supervisor->designation,
                    'department' => $supervisor->department->name,
                    'faculty_code' => $supervisor->faculty_code,
                ];
            }),
            'preferences' => $this->preferences?->map(function($preference){
                return [
                    'faculty_code' => $preference?->supervisor_id,
                    'name' => $preference?->supervisor?->user->name(),
                    'preference' => $preference?->preference,
                ];
            }),
            'updated_supervisors' => $this->updatedSupervisors?->map(function($updatedSupervisor){
                return [
                    'old_supervisor' => $updatedSupervisor->oldSupervisor?->user?->name(),
                    'old_supervisor_id' => $updatedSupervisor->oldSupervisor->faculty_code,
                    'new_supervisor' => $updatedSupervisor->newSupervisor?->user?->name(),
                   'new_supervisor_id' => $updatedSupervisor->newSupervisor?->faculty_code,
                ];
            }),
            'status' => $this->status,
            'stage' => $this->stage,
            'hod_approval' => $this->hod_approval,
            'dra_approval' => $this->dra_approval,
            'dordc_approval' => $this->dordc_approval,
            'HODComments' => $this->HODComments,
            'DORDCComments' => $this->DORDCComments,
            'DRAComments' => $this->DRAComments,
            'student_lock' => $this->student_lock,
            'hod_lock' => $this->hod_lock,
            'dordc_lock' => $this->dordc_lock,
            'dra_lock' => $this->dra_lock,
            'role' => $user->role->role,
        ];
    }

    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id', 'roll_no');
    }

    public function preferences()
    {
        return $this->hasMany(SupervisorChangeFormPreference::class, 'form_id', 'id');
    }

    public function updatedSupervisors()
    {
        return $this->hasMany(SupervisorChangeFormUpdatedSupervisor::class, 'form_id');
    }
    

}

