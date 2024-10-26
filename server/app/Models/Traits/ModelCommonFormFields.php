<?php
namespace App\Models\Traits;

use App\Models\Student; // Ensure you have the correct namespace for the Student model

trait ModelCommonFormFields
{
    // Common fields that every form will use
    public function getCommonFields()
    {
        return [
            'student_id' => $this->student_id,
            'status' => $this->status,
            'stage' => $this->stage,
            'completion' => $this->completion,
            'steps' => $this->steps,
            'current_step' => $this->current_step,
            'student_lock' => $this->student_lock,
            'hod_lock' => $this->hod_lock,
            'supervisor_lock' => $this->supervisor_lock,
            'dordc_lock' => $this->dordc_lock,
            'dra_lock' => $this->dra_lock,
            'external_lock' => $this->external_lock,
            'director_lock' => $this->director_lock,
            'phd_coordinator_lock' => $this->phd_coordinator_lock,
            'doctoral_lock' => $this->doctoral_lock,
            'student_comments' => $this->student_comments,
            'hod_comments' => $this->hod_comments,
            'supervisor_comments' => $this->supervisor_comments,
            'dordc_comments' => $this->dordc_comments,
            'external_comments' => $this->external_comments,
            'dra_comments' => $this->dra_comments,
            'director_comments' => $this->director_comments,
            'doctoral_comments' => $this->doctoral_comments,
            'phd_coordinator_comments' => $this->phd_coordinator_comments,
            'supervisor_approval' => $this->supervisor_approval,
            'phd_coordinator_approval' => $this->phd_coordinator_approval,
            'hod_approval' => $this->hod_approval,
            'dordc_approval' => $this->dordc_approval,
            'external_approval' => $this->external_approval,
            'doctoral_approval' => $this->doctoral_approval,
            'dra_approval' => $this->dra_approval,
            'director_approval' => $this->director_approval,
            'history' => $this->history,
        ];
    }

    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id', 'roll_no');
    }


    public function addHistoryEntry($action, $user,$comments=null, $status = null)
    {
        $entry = [
            'action' => $action,
            'user' => $user,
            'status' => $status,
            'comment' => $comments,
            'timestamp' => now(),
        ];
        if (is_null($this->history)) {
            $this->history = [];
        }
        $echo = $this->history;
        if(is_array($echo)){
            array_push($echo, $entry);
        }
        else{
            $echo = [];
            array_push($echo, $entry);
        }
        $this->history = $echo;
        $this->save();
    }

    public function fullCommonForm($user, array $extraData = [])
    {
        return array_merge([
            'form_id' => $this->id,
            'name' => $this->student->user->name(),
            'roll_no' => $this->student->roll_no,
            'email' => $this->student->user->email,
            'phone' => $this->student->user->phone,
            'department' => $this->student->department->name,
            'date_of_registration' => $this->student->date_of_registration,
            'phd_title' => $this->student->phd_title,
            'gender' => $this->student->user->gender,
            'cgpa' => $this->student->cgpa,
            'role' => $user->role->role,
            'semester' => $this->semester,
            'chairman' => [
                'name' => $this->student->department->hod->user->name(),
                'designation' => $this->student->department->hod->designation,
                'department' => $this->student->department->name
            ],
            'supervisors' => $this->student->supervisors?->map(function ($supervisor) {
                return [
                    'name' => $supervisor->user->name(),
                    'designation' => $supervisor->designation,
                    'department' => $supervisor->department->name
                ];
            }),
            'status' => $this->status,
            'stage' => $this->stage,
            'comments' => [
                'student' => $this->student_comments,
                'hod' => $this->hod_comments,
                'supervisor' => $this->supervisor_comments,
                'phd_coordinator' => $this->phd_coordinator_comments,
                'dordc' => $this->dordc_comments,
                'dra' => $this->dra_comments,
                'doctoral' => $this->doctoral_comments,
                'external' => $this->external_comments,
                'director' => $this->director_comments,
            ],
            'locks' => [
                'student' => $this->student_lock,
                'hod' => $this->hod_lock,
                'supervisor' => $this->supervisor_lock,
                'phd_coordinator' => $this->phd_coordinator_lock,
                'dordc' => $this->dordc_lock,
                'dra' => $this->dra_lock,
                'doctoral' => $this->doctoral_lock,
                'external' => $this->external_lock,
                'director' => $this->director_lock,
            ],
            'approvals' => [
                'supervisor' => $this->supervisor_approval,
                'phd_coordinator' => $this->phd_coordinator_approval,
                'hod' => $this->hod_approval,
                'dordc' => $this->dordc_approval,
                'dra' => $this->dra_approval,
                'doctoral' => $this->doctoral_approval,
                'external' => $this->external_approval,
                'director' => $this->director_approval,
            ],
            'steps' => $this->steps,
            'current_step' => $this->current_step,
            'history' => $this->history,        
        ], $extraData);
    }
}
