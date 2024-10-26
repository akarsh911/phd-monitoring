<?php

namespace App\Http\Controllers\Traits;

trait GeneralFormHandler
{
    private function handleStudentForm($user, $form_id, $modelClass,$steps, callable $callback = null)
    {
        try {
            $student = $user->student;
            if (!$student) {
                return response()->json(['message' => 'Student not found'], 404);
            }
            if(!$form_id)
            $form_id =  $modelClass::where('student_id', $student->roll_no)->first()?->id;
            $formInstance = $modelClass::find($form_id);
            if ($formInstance) {
                if ($formInstance->student->id == $student->id) {
                    return response()->json($formInstance->fullForm($user));
                } else {
                    return response()->json(['message' => 'You are not authorized to access this resource'], 403);
                }
            } else if(!$form_id){ 
            
                $newForm = new $modelClass([
                    'student_id' => $student->roll_no,
                    'status' => 'draft',
                    'stage' => 'student',
                    'student_lock' => false,
                    'steps'=>$steps
                ]);
                if($callback){
                    $callback($newForm);
                }

                $newForm->save();
                $newForm->addHistoryEntry('Student Initiated Form', $user->name());
                return response()->json($newForm->fullForm($user));
            }
            else{
                return response()->json(['message' => 'No form found'], 404);
            }
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }
    }

    private function handleCoordinatorForm($user, $form_id, $modelClass)
    {
        try {

            $formInstance = $modelClass::find($form_id);
            if ($formInstance) {
                $student = $formInstance->student;
                if ($student->department->checkCoordinates($user->faculty->faculty_code)) {
                    $index=array_search('phd_coordinator',$formInstance->steps);
                    if($index!==false && $index<=$formInstance->current_step)
                    return response()->json($formInstance->fullForm($user));
                    else
                    return response()->json(['message' => 'The form is not yet assigned to you for review or action.'], 404);
                } else {
                    return response()->json(['message' => 'You are not authorized to access this resource'], 403);
                }
            } else {
                return response()->json(['message' => 'No form found'], 404);
            }
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }
    }

    private function handleHodForm($user, $form_id, $modelClass)
    {
        try {
            $formInstance = $modelClass::find($form_id);
            if ($formInstance) {
                $student = $formInstance->student;
                if ($student->department->hod->faculty_code == $user->faculty->faculty_code) {
                    $index=array_search('hod',$formInstance->steps);
                    if($index!==false && $index<=$formInstance->current_step)
                    return response()->json($formInstance->fullForm($user));
                    else
                    return response()->json(['message' => 'The form is not yet assigned to you for review or action.'], 404);
                } else {
                    return response()->json(['message' => 'You are not authorized to access this resource'], 403);
                }
            } else {
                return response()->json(['message' => 'No form found'], 404);
            }
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }
    }

    private function handleAdminForm($user, $form_id, $modelClass)
    {
        try {
            $formInstance = $modelClass::find($form_id);
            if ($formInstance) {
                $index=array_search($user->role->role,$formInstance->steps);
                if($index!==false && $index<=$formInstance->current_step)
                return response()->json($formInstance->fullForm($user));
                else
                return response()->json(['message' => 'The form is not yet assigned to you for review or action.'], 404);
            } else {
                return response()->json(['message' => 'No form found'], 404);
            }
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }
    }

    private function handleFacultyForm($user, $form_id, $modelClass)
    {
        try {
            $formInstance = $modelClass::find($form_id);
            if ($formInstance) {
                $student = $formInstance->student;
                if ($student->checkSupervises($user->faculty->faculty_code)) {
                    $index=array_search('faculty',$formInstance->steps);
                    if($index!==false && $index<=$formInstance->current_step)
                    return response()->json($formInstance->fullForm($user));
                    else
                    return response()->json(['message' => 'The form is not yet assigned to you for review or action.'], 404);
                } else {
                    return response()->json(['message' => 'You are not authorized to access this resource'], 403);
                }
            } else {
                return response()->json(['message' => 'No form found'], 404);
            }
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }
    }

    private function handleDoctoralForm($user, $form_id, $modelClass){
        try {
            $formInstance = $modelClass::find($form_id);
            if ($formInstance) {
                $student = $formInstance->student;
                if ($student->checkDoctoralCommittee($user->faculty->faculty_code)) {
                    $index=array_search('doctoral',$formInstance->steps);
                    if($index!==false && $index<=$formInstance->current_step)
                    return response()->json($formInstance->fullForm($user));
                    else
                    return response()->json(['message' => 'The form is not yet assigned to you for review or action.'], 404);
                } else {
                    return response()->json(['message' => 'You are not authorized to access this resource'], 403);
                }
            } else {
                return response()->json(['message' => 'No form found'], 404);
            }
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }
    }
}
