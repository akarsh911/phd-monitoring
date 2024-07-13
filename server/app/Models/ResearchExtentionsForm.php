<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResearchExtentionsForm extends Model
{
    use HasFactory;

    protected $table = 'research_extentions_form';

    protected $fillable = [
        'student_id',
        'status',
        'stage',
        'start_date',
        'end_date',
        'reason',
        'hod_approval',
        'student_lock',
        'supervisor_lock',
        'hod_lock',
        'dordc_lock',
        'dra_lock',
        'SuperVisorComments',
        'HODComments',
        'DORDCComments',
        'DRAComments'
    ];

    public function fullForm($user)
    {
        
        return [
            'form_id'=>$this->id,
            'name'=> $this->student->user->name(),
            'roll_no' => $this->student->roll_no,
            'department' => $this->student->department->name,
            'phone' => $this->student->user->phone,
            'date_of_registration' => $this->student->date_of_registration,
            'phd_title' => $this->student->phd_title,
            'role'=>$user->role->role,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'reason' => $this->reason,
            'supervisors' => $this->student->supervisors->map(function($supervisor){
                return [
                    'name' => $supervisor->user->name(),
                    'designation' => $supervisor->designation,
                    'department' => $supervisor->department->name
                ];
            }),
            'status' => $this->status,
            'stage' => $this->stage,
            'SuperVisorComments' => $this->SuperVisorComments,
            'hod_approval' => $this->hod_approval,
            'HODComments' => $this->HODComments,
            'DORDCComments' => $this->DORDCComments,
            'DRAComments' => $this->DRAComments,
            'student_lock' => $this->student_lock,
            'hod_lock' => $this->hod_lock,
            'supervisor_lock' => $this->supervisor_lock,
            'dordc_lock' => $this->dordc_lock,
            'dra_lock' => $this->dra_lock,
            'researchExtentions' => $this->researchExtentions->map(function($extention){
                return [
                    'period_of_extension' => $extention->period_of_extension,
                    'start' => $extention->start,
                    'end' => $extention->end,
                    'reason' => $extention->reason,
                ];
            }),
            'supervisorApprovals' => $this->researchExtentionsApprovals->map(function($approval){
                return [
                    'supervisor_id' => $approval->supervisor_id,
                    'status' => $approval->status,
                    'comments' => $approval->comments,
                    'name' => $approval->supervisor->user->name(),
                ];
            }),
            'user_name'=>$user->name(),
        ];
    }

    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id', 'roll_no');
    }

    public function researchExtentions()
    {
        return $this->hasMany(ResearchExtentions::class, 'research_extentions_id');
    }

    public function researchExtentionsApprovals()
    {
        return $this->hasMany(ResearchExtentionsApprovals::class, 'research_extentions_id');
    }
}
