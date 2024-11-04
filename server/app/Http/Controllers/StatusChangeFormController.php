<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Traits\GeneralFormCreate;
use App\Http\Controllers\Traits\GeneralFormHandler;
use App\Http\Controllers\Traits\GeneralFormList;
use App\Http\Controllers\Traits\GeneralFormSubmitter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Traits\SaveFile;
use App\Models\StudentStatusChangeForms;

class StatusChangeFormController extends Controller
{
    use GeneralFormHandler;
    use GeneralFormSubmitter;
    use SaveFile;
    use GeneralFormCreate;
    use GeneralFormList;

    public function listForm(Request $request, $student_id=null)
    {
       $user = Auth::user();
       if($student_id)
         return $this->listFormsStudent($user, StudentStatusChangeForms::class, $student_id);
       return $this->listForms($user, StudentStatusChangeForms::class);
    }

    public function createForm(Request $request)
    {
        $user = Auth::user();
        $role = $user->role;
        $steps=['student','faculty','phd_coordinator','hod','dra','dordc','complete'];
        if($role->role != 'student'){
            return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }
        $status_changes=$user->student->statusChanges();
        if($status_changes->count()>0){
            $steps=['student','faculty','phd_coordinator','hod','dra','dordc','director','complete'];
        }
        $data=[
            'roll_no'=>$user->student->roll_no,
            'steps'=>$steps,
            'role'=>$role->role,
            'name'=>$user->first_name.' '.$user->last_name
        ];
        
        return $this->createForms(StudentStatusChangeForms::class, $data, function ($formInstance) use ($user) {
            $change = $user->student->current_status == "full-time" ? "full-time to part-time" : "part-time to full-time";
            $formInstance->type_of_change = $change;
            $formInstance->save();
        });
    }


    public function loadForm(Request $request, $form_id=null)
    {
        $model = StudentStatusChangeForms::class;
        $user = Auth::user();
        $role = $user->role;
        $steps=['student','faculty','phd_coordinator','hod','dra','dordc'];
        switch ($role->role) {
            case 'student':
                return $this->customLoadStudent($user, $form_id, $model,$steps);
            case 'hod':
                return $this->handleHodForm($user, $form_id, $model);
            case 'phd_coordinator':
                return $this->handleCoordinatorForm($user, $form_id, $model);
            case 'dra':
            case 'dordc':
            case 'director':
                return $this->handleAdminForm($user, $form_id, $model);
            case 'faculty':
                return $this->handleFacultyForm($user, $form_id, $model);
            default:
                return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }
    }

    private function customLoadStudent($user, $form_id, $model,$steps) {
        return $this->handleStudentForm($user, $form_id, $model,$steps);
    }
    
    public function submit(Request $request, $form_id)
    {
        $user = Auth::user();
        $role = $user->role;

        switch ($role->role) {
            case 'student':
                return $this->studentSubmit($user, $request, $form_id);
            case 'faculty':
                return $this->supervisorSubmit($user, $request, $form_id);
            case 'phd_coordinator':
                return $this->coordinatorSubmit($user, $request, $form_id);
            case 'hod':
                return $this->hodSubmit($user, $request, $form_id);
            case 'dra':
                return $this->draSubmit($user, $request, $form_id);
            case 'dordc':
                return $this->dordcSubmit($user, $request, $form_id);
            case 'director':
                return $this->directorSubmit($user, $request, $form_id);
            default:
                return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }
    }

    private function studentSubmit($user, $request, $form_id)
    {
        $model = StudentStatusChangeForms::class;
        return $this->submitForm($user, $request, $form_id, $model, 'student', 'student', 'faculty',
        function ($formInstance) use ($request, $user) {
            $request->validate([
                'reason' => 'required|string',
            ]);
            $formInstance->reason = $request->reason;
            $prevStatusChanges = $user->student->statusChanges();
            if ($prevStatusChanges->count() > 2) {
               throw new \Illuminate\Validation\ValidationException(['reason' => 'You have already changed your status twice']);
            }
        });
   
    }

    private function supervisorSubmit($user, $request, $form_id)
    {
        $model = StudentStatusChangeForms::class;
        return $this->submitForm($user, $request, $form_id, $model, 'faculty', 'student', 'phd_coordinator');
    }

    private function coordinatorSubmit($user, $request, $form_id)
    {
        $model = StudentStatusChangeForms::class;
        return $this->submitForm($user, $request, $form_id, $model, 'phd_coordinator', 'faculty', 'hod');
    }

    private function hodSubmit($user, $request, $form_id)
    {
        $model = StudentStatusChangeForms::class;
        return $this->submitForm($user, $request, $form_id, $model, 'hod', 'phd_coordinator', 'dra');
    }


    private function draSubmit($user, $request, $form_id)
    {
        $model = StudentStatusChangeForms::class;
        return $this->submitForm($user, $request, $form_id, $model, 'dra', 'hod', 'dordc');
    }

    private function dordcSubmit($user, $request, $form_id)
    {
        $model = StudentStatusChangeForms::class;
        $student=StudentStatusChangeForms::find($form_id)->student;
        $prevStatusChanges = $student->statusChanges();
        if ($prevStatusChanges->count() > 1) {
            return $this->submitForm($user, $request, $form_id, $model, 'dordc', 'dra', 'director');
        }
        else{
            return $this->submitForm($user, $request, $form_id, $model, 'dordc', 'dra', 'complete',
            function ($formInstance) use ($request, $user) {
                if($request->approval){
                    $formInstance->status = 'approved';
                    $formInstance->completion = 'complete';
                    $formInstance->addHistoryEntry('Status Change Approved', $user->name());
                    $student=$formInstance->student;
                    $student->current_status = $formInstance->type_of_change == "full-time to part-time" ? "part-time" : "full-time";
                    echo  $formInstance->type_of_change == "full-time to part-time" ? "part-time" : "full-time";;
                    $student->statusChanges()->create([
                        'type_of_change' => $formInstance->type_of_change,
                        'reason' => $formInstance->reason,
                    ]);
                    $formInstance->save();
                    $student->save();
                }
            });
        }
    }

    private function directorSubmit($user, $request, $form_id)
    {
        $model = StudentStatusChangeForms::class;
        return $this->submitForm($user, $request, $form_id, $model, 'director', 'dordc', 'complete',
        function ($formInstance) use ($request, $user) {
            if($request->approval){
                $formInstance->status = 'approved';
                $formInstance->completion = 'complete';
                $formInstance->addHistoryEntry('Status Change Approved', $user->name());
                $student=$formInstance->student;    
                $student->current_status = $formInstance->type_of_change == "full-time to part-time" ? "part-time" : "full-time";
                
                $student->statusChanges()->create([
                    'type_of_change' => $formInstance->type_of_change,
                    'reason' => $formInstance->reason,
                ]);
                $formInstance->save();
                $student->save();
            }
        });
    }
}