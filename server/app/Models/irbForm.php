<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IrbForm extends Model
{
    use HasFactory;

    protected $table = 'irb_forms';

    protected $fillable = [
        'student_id',
        'status',
        'stage',
        'SuperVisorComments',
        'hod_approval',
        'HODComments',
        'DORDCComments',
        'DRAComments',
        'student_lock',
        'hod_lock',
        'supervisor_lock',
        'dordc_lock',
        'dra_lock',
        'semester'
    ];
    public function fullForm($user)
    {
        
        return [
            'form_id'=>$this->id,
            'name'=> $this->student->user->name(),
            'roll_no' => $this->student->roll_no,
            'department' => $this->student->department->name,
            'date_of_registration' => $this->student->date_of_registration,
            'phd_title' => $this->student->phd_title,
            'gender' => $this->student->user->gender,
            'cgpa' => $this->student->cgpa,
            'role'=>$user->role->role,
            'semester' => $this->semester,  
            'chairman' => [
                'name' => $this->student->department->hod->user->name(),
                'designation' => $this->student->department->hod->designation,
                'department' => $this->student->department->name
            ],
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
            'nominee_cognates' => $this->nomineeCognates->map(function($nominee){
                return [
                    'faculty_code' => $nominee->nominee->faculty_code,
                    'name' => $nominee->nominee->user->name(),
                ];
            }),
            'outside_experts' => $this->outsideExperts->map(function($expert){
                $expert = $expert->expert;
                return [
                    'id' => $expert->id,
                    'first_name' => $expert->first_name,
                    'last_name' => $expert->last_name,
                    'designation' => $expert->designation,
                    'department' => $expert->department,
                    'institution' => $expert->institution,
                    'email' => $expert->email,
                    'phone' => $expert->phone
                ];
            }),
            'chairman_experts' => $this->chairmanExperts->map(function($expert){
                return [
                    'name' => $expert->expert->user->name(),
                    'designation' => $expert->expert->designation,
                    'department' => $expert->expert->department->name
                ];
            }),
            'form_histories' => $this->formHistories,
            'student_lock' => $this->student_lock,
            'hod_lock' => $this->hod_lock,
            'supervisor_lock' => $this->supervisor_lock,
            'dordc_lock' => $this->dordc_lock,
            'dra_lock' => $this->dra_lock,
            'suggestions' => Faculty::all()->map(function($faculty){
                return [
                    'name' => $faculty->user->name(),
                    'designation' => $faculty->designation,
                    'department' => $faculty->department->name,
                    'email' => $faculty->user->email,
                    'faculty_code' => $faculty->faculty_code,
                ];
            })
        ];
    }

    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id', 'roll_no');
    }

    public function nomineeCognates()
    {
        return $this->hasMany(IrbNomineeCognate::class,'irb_form_id','id');
    }

    public function outsideExperts()
    {
        return $this->hasMany(IrbOutsideExpert::class, 'irb_form_id');
    }

    public function expertDepartments()
    {
        return $this->hasMany(IrbExpertDepartment::class, 'irb_form_id');
    }

    public function formHistories()
    {
        return $this->hasMany(IrbFormHistory::class, 'irb_form_id');
    }

    public function supervisorApprovals()
    {
        
        return $this->hasMany(IrbSupervisorApproval::class,'irb_form_id','id');
    }

    public function chairmanExperts()
    {
        return $this->hasMany(IrbExpertChairman::class,'irb_form_id');
    }
    
}
