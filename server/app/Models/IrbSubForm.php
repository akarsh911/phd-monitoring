<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IrbSubForm extends Model
{
    use HasFactory;

    // The table associated with the model
    protected $table = 'irb_sub_forms';

    // The primary key associated with the table
    protected $primaryKey = 'id';

    // Indicates if the IDs are auto-incrementing
    public $incrementing = true;

    // The attributes that are mass assignable
    protected $fillable = [
        'student_id',
        'form_type',
        'phd_title',
        'revised_phd_title',
        'irb_pdf',
        'revised_irb_pdf',
        'status',
        'stage',
        'supervisor_approval',
        'hod_approval',
        'phd_coordinator_approval',
        'dra_approval',
        'dordc_approval',
        'student_lock',
        'supervisor_lock',
        'hod_lock',
        'dordc_lock',
        'dra_lock',
        'SuperVisorComments',
        'HODComments',
        'DORDCComments',
        'DRAComments',
        
    ];

    // The attributes that should be cast to native types
    protected $casts = [
        'form_type' => 'string',
        'status' => 'string',
        'stage' => 'string',
    ];
    public function fullForm($user)
    {
        return [
            'form_id'=>$this->id,
            'name'=> $this->student->user->name(),
            'roll_no' => $this->student->roll_no,
            'department' => $this->student->department->name,
            'cgpa' => $this->student->user->phone,
            'phd_title' => $this->student->phd_title,
            'role'=>$user->role->role,
            'objectives' => $this->objectives->map(function($objective){
                return [
                    'objective' => $objective->objective,
                    'type' => $objective->type,
                ];
            }),
            'revised_phd_title' => $this->revised_phd_title,
            'irb_pdf' => $this->irb_pdf,
            'revised_irb_pdf' => $this->revised_irb_pdf,
            'supervisors' => $this->student->supervisors->map(function($supervisor){
                return [
                    'name' => $supervisor->user->name(),
                    'designation' => $supervisor->designation,
                    'department' => $supervisor->department->name,
                    'outside' => $supervisor->supervised_outside,
                    'campus' => $supervisor->supervised_campus,
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
            'supervisorApprovals' => $this->supervisorApprovals->map(function($approval){
                return [
                    'supervisor_id' => $approval->supervisor_id,
                    'status' => $approval->status,
                    'comments' => $approval->comments,
                    'name' => $approval->supervisor->user->name(),
                ];
            }),
        ];
    }
    // Relationships
    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id', 'roll_no');
    }

    public function history()
    {
        return $this->hasMany(IrbSubFormHistory::class, 'sub_form_id', 'id');
    }

    public function objectives()
    {
        return $this->hasMany(IrbFormObjective::class, 'irb_form_id', 'id');
    }

    public function supervisorApprovals()
    {
        
        return $this->hasMany(IrbSupervisorApproval::class,'irb_sub_form_id','id');
    }
}
