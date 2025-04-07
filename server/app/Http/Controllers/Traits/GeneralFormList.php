<?php

namespace App\Http\Controllers\Traits;

// use App\Http\Traits\FilterLogicTrait;

use App\Models\Student;
use App\Http\Controllers\Traits\FilterLogicTrait;

trait GeneralFormList
{
    use FilterLogicTrait;
    use PagenationTrait;
    private function listForms($user,$model, $request,$filters=null,$override=false, $fields=[]){
        $role=$user->current_role->role;
        $page = $request->input('page', 1);
        $rows = $request->input('rows', 50);
        $filters= $request->input('filters', null);
        $filtersJson = $request->query('filters');

        if ($filtersJson) {
              $filters = json_decode(urldecode($filtersJson), true);
        }

        switch ($role) {
            case 'student':
                return $this->listStudentForms($user, $model, $filters, $page,$rows, $fields);
            case 'hod':
            case 'phd_coordinator':
                return $this->listHodForms($user, $model, $filters, false,$page,$rows, $fields, );
            case 'dra':
            case 'dordc':
            case 'director':
            case 'admin':
                return $this->listAdminForms($user, $model, $filters, $page,$rows, $fields, );
            case 'faculty':
                return $this->listFacultyForms($user, $model, $filters, $override, $page,$rows, $fields );
            case 'doctoral':
            case 'external':
                return $this->listDoctoralForms($user, $model, $filters, $override, $page,$rows, $fields, );
            default:
                return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }
    }

   


private function paginateAndMap($formsQuery, $page, $fields, $perPage = 50,$user)
{
    $total = $formsQuery instanceof \Illuminate\Database\Eloquent\Builder || $formsQuery instanceof \Illuminate\Database\Query\Builder
                ? $formsQuery->count()
                : count($formsQuery);
    $totalPages = ceil($total / $perPage);
    
    $forms = $this->applyPagination($formsQuery, $page, $perPage);
    
    if ($forms instanceof \Illuminate\Database\Eloquent\Builder || $forms instanceof \Illuminate\Database\Query\Builder) {
        $forms = $forms->get();
    }
    
    return [
        'data' => collect($forms)->map(fn($form) => $this->mapForm($form, $fields['extra_fields'] ?? []))->values(),
        'page' => $page,
        'total' => $total,
        'totalPages' => $totalPages,
        'fields' => $fields['fields'] ?? [],
        'fieldsTitles' => $fields['titles'] ?? [],
        'roles' => $user->current_role->role,
    ];
}


    private function mapForm($form, $fields = [])
    {
        $formData = [
            'name' => $form->student->user->name(),
            'stage' => $form->stage,
            'roll_no' => $form->student->roll_no,
            'status' => $form->status,
            'completion' => $form->completion,
            'created_at' => $form->created_at,
            'updated_at' => $form->updated_at,
            'action_req' => $form->student_lock,
            'id' => $form->id,
        ];

        foreach ($fields as $key => $field) {
            if (is_string($field) && isset($form->$field)) {
                $formData[$field] = $form->$field;
            } elseif (is_callable($field)) {
                  $formData[$key] = $field($form);
            } elseif (isset($form->student->$field)) {
                $formData[$field] = $form->student->$field;
            }
        }

        return $formData;
    }


    private function listFormsStudent($user, $model, $student_id)
    {
        $role = $user->current_role->role;
        $student=Student::find($student_id);
        if(!$student){
            return response()->json(['message' => 'Student not found'], 404);
        }
        switch ($role) {
            case 'hod':
            case 'phd_coordinator':
                if($student->department_id!=$user->faculty->department_id){
                    return response()->json(['message' => 'You are not authorized to access this resource'], 403);
                }
                break;
            case 'faculty':
                if(!$user->faculty->supervisedStudents->contains('roll_no',$student_id)){
                    return response()->json(['message' => 'You are not authorized to access this resource'], 403);
                }
                break;
            case 'doctoral':
            case 'external':
                if(!$student->checkDoctoralCommittee($user->faculty->faculty_code)){
                    return response()->json(['message' => 'You are not authorized to access this resource'], 403);
                }
                break;
            case 'student':
                    return response()->json(['message' => 'You are not authorized to access this resource'], 403);  
                break;
            default:
            break;
          }
        $formsQuery = $model::where('student_id', $student_id);
        $filteredForms = $formsQuery->get()->filter(function ($form) use ($role) {
            $index = array_search($role, $form->steps);
            return $index !== false && $index <= $form->maximum_step;
        });
        return  response()->json($filteredForms, 200); 
    }


    private function listStudentForms($user, $model, $filters = null, $page = 1, $rows = 50, $fields = [])
    {
        $student = $user->student;
        $role = $user->current_role->role;
        $formsQuery = $model::where('student_id', $student->roll_no);

        if ($filters) {
            $formsQuery = $this->applyDynamicFilters($formsQuery, $filters);
        }
        

        return $this->paginateAndMap($formsQuery, $page, $fields, $rows, $user);
    }

    private function listAdminForms($user, $model, $filters = null, $page = 1, $rows = 50, $fields = [])
    {
        $formsQuery = $model::query();

        if ($filters) {
            $formsQuery = $this->applyDynamicFilters($formsQuery, $filters);
        }
        

        return $this->paginateAndMap($formsQuery, $page, $fields, $rows, $user);
    }

private function listFacultyForms($user, $model, $filters = null, $override = false, $page = 1,$rows=50, $fields = [])
{ 
    $faculty = $user->faculty;
    $supervisedStudents = $faculty->supervisedStudents();
    $studentIds = $supervisedStudents->pluck('roll_no');

    $formsQuery = $model::whereIn('student_id', $studentIds);

    if ($filters) {
        $formsQuery = $this->applyDynamicFilters($formsQuery, $filters);
    }
    

    return $this->paginateAndMap($formsQuery, $page, $fields,$rows, $user);
}

private function listHodForms($user, $model, $filters = null, $override = false, $page = 1,$rows=50, $fields = [])
{
    $department = $user->faculty->department;
    $students = Student::where('department_id', $department->id)->pluck('roll_no');

    $formsQuery = $model::whereIn('student_id', $students);

    if ($filters) {
        $formsQuery = $this->applyDynamicFilters($formsQuery, $filters);
    }
    
    return $this->paginateAndMap($formsQuery, $page, $fields,$rows, $user);
}

private function listDoctoralForms($user, $model, $filters = null, $override = false, $page = 1,$rows=50, $fields = [])
{
    $faculty = $user->faculty;
    $doctoralStudents = $faculty->doctoredStudents();
    $studentIds = $doctoralStudents->pluck('roll_no');

    $formsQuery = $model::whereIn('student_id', $studentIds);

    if ($filters) {
        $formsQuery = $this->applyDynamicFilters($formsQuery, $filters);
    }
    

    return $this->paginateAndMap($formsQuery, $page, $fields,$rows, $user);
}

    
}