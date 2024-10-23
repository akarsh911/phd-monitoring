<?php

namespace App\Http\Controllers\Traits;

trait GeneralFormList
{
    private function listForms($user,$model,$filters=null){
        $role=$user->role->role;
        switch ($role) {
            case 'student':
                return $this->listStudentForms($user, $model, $filters);
            case 'hod':
            case 'phd_coordinator':
                return $this->listHodForms($user, $model, $filters);
            case 'dra':
            case 'dordc':
            case 'director':
                return $this->listAdminForms($user, $model, $filters);
            case 'faculty':
                return $this->listFacultyForms($user, $model, $filters);
            // case 'external':
            //     return $this->listExternalForms($user, $model, $filters);
            //TODO: Add external forms
            default:
                return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }
    }

    private function listStudentForms($user, $model, $filters = null)
    {
        $student = $user->student;
        $role = $user->role->role;
    
        $formsQuery = $model::where('student_id', $student->roll_no);
        
        // Apply additional filters if provided
        if ($filters) {
            $formsQuery->where($filters);
        }
    
        // Fetch forms and filter them based on role and step conditions
        $filteredForms = $formsQuery->get()->filter(function ($form) use ($role) {
            if(!$form){
                return [];
            }
            $index = array_search($role, $form->steps);
            return $index !== false && $index >= $form->current_step;
        });
    
        return $filteredForms->values();
    }
    
    
    private function listHodForms($user, $model, $filters = null)
    {
        $role = $user->role->role;
        $department = $user->department;
        $formsQuery = $model::where('department_id', $department->id);
    
        // Apply additional filters if provided
        if ($filters) {
            $formsQuery->where($filters);
        }
    
        // Fetch forms and filter them based on role and step conditions
        $filteredForms = $formsQuery->get()->filter(function ($form) use ($role) {
            $index = array_search($role, $form->steps);
            return $index !== false && $index <= $form->current_step;
        });
    
        return $filteredForms->values();
    }

    private function listAdminForms($user, $model, $filters = null)
{
    $role = $user->role->role;
    $formsQuery = $model::query();

    // Apply additional filters if provided
    if ($filters) {
        $formsQuery->where($filters);
    }

    // Fetch forms and filter them based on role and step conditions
    $filteredForms = $formsQuery->get()->filter(function ($form) use ($role) {
        $index = array_search($role, $form->steps);
        return $index !== false && $index <= $form->current_step;
    })->map(function ($form) use ($role) {
        // Dynamically access the lock field based on the role
        $lockField = $role . '_lock';
        $form->action_req = !$form->$lockField;
        return $form;
    });

    return $filteredForms->values();
}


    private function listFacultyForms($user, $model, $filters = null)
    {
        $role = $user->role->role;
        $faculty = $user->faculty;
        $supervisedStudents = $faculty->supervisedStudents();
        $studentIds = $supervisedStudents->pluck('roll_no');
        
        $formsQuery = $model::whereIn('student_id', $studentIds);
    
        // Apply additional filters if provided
        if ($filters) {
            $formsQuery->where($filters);
        }
    
        // Fetch forms and filter them based on role and step conditions
        $filteredForms = $formsQuery->get()->filter(function ($form) use ($role) {
            $index = array_search($role, $form->steps);
            return $index !== false && $index <= $form->current_step;
        })->map(function ($form) {
            $form->action_req = !$form->supervisor_lock;
            return $form;
        });;
    
        return $filteredForms->values();
    }
    
}