<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Traits\GeneralFormCreate;
use Illuminate\Http\Request;
use App\Http\Controllers\Traits\GeneralFormHandler;
use App\Http\Controllers\Traits\GeneralFormList;
use App\Http\Controllers\Traits\GeneralFormSubmitter;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Traits\SaveFile;

use App\Models\ThesisExtentionForm;

class ThesisExtentionController extends Controller
{
    use GeneralFormHandler;
    use GeneralFormSubmitter;
    use GeneralFormList;
    use SaveFile;
    use GeneralFormCreate;

    public function listForm(Request $request, $student_id=null)
    {
       $user = Auth::user();
       if($student_id)
         return $this->listFormsStudent($user, ThesisExtentionForm::class, $student_id);
       return $this->listForms($user, ThesisExtentionForm::class);
    }

    public function createForm(Request $request)
    {
        $user = Auth::user();
        $role = $user->role;
        $steps=['student','faculty','phd_coordinator','hod','dra','dordc'];
        if($role->role != 'student'){
            return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }
        $data=[
            'roll_no'=>$user->student->roll_no,
            'steps'=>$steps,
            'role'=>$role->role,
            'name'=>$user->first_name.' '.$user->last_name
        ];
        return $this->createForms(ThesisExtentionForm::class, $data);
    }

    
    public function loadForm(Request $request, $form_id=null)
    {
        $user = Auth::user();
        $role = $user->role;
        $model = ThesisExtentionForm::class;
        $steps=['student','faculty','phd_coordinator','hod','dra','dordc'];
        switch ($role->role) {
            case 'student':
                return $this->handleStudentForm($user, $form_id, $model,$steps);
            case 'hod':
                return $this->handleHodForm($user, $form_id, $model);
            case 'phd_coordinator':
                return $this->coordinatorSubmit($user, $form_id, $model);
            case 'dra':
            case 'dordc':
                return $this->handleAdminForm($user, $form_id, $model);
            case 'faculty':
                return $this->handleFacultyForm($user, $form_id, $model);
            default:
                return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }
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
            case 'hod':
                return $this->hodSubmit($user, $request, $form_id);
            case 'dra':
                return $this->draSubmit($user, $request, $form_id);
            case 'dordc':
                return $this->dordcSubmit($user, $request, $form_id);
            case 'phd_coordinator':
                return $this->coordinatorSubmit($user, $request, $form_id);
            default:
                return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }
    }


    private function studentSubmit($user, $request, $form_id)
    {
        $model = ThesisExtentionForm::class;

        return $this->submitForm(
            $user,
            $request,
            $form_id,
            $model,
            'student',
            'student',
            'faculty',
            function ($formInstance) use ($request, $user) {
                $request->validate([
                    'reason' => 'string',
                ]);
                if($formInstance->student->date_of_synopsis==null){
                    $request->validate([
                        'date_of_synopsis' => 'required|date',
                    ]);
                    $formInstance->student->date_of_synopsis = $request->date_of_synopsis;
                    $formInstance->student->save();
                }
                if($formInstance->student->thesisExtentions->count()>0){
                    $request->validate([
                        'previous_extention_pdf' => 'required|file|mimes:pdf|max:2048',
                    ]);
                    $link=$this->saveUploadedFile($request->file('previous_extention_pdf'), 'thesis_extention', $user->student->roll_no);
                    $formInstance->previous_extention_pdf = $link;
                }
                $formInstance->reason = $request->reason;
        }
        );
    }

    private function supervisorSubmit($user, $request, $form_id)
    {
        $model = ThesisExtentionForm::class;
        return $this->submitForm(
            $user,
            $request,
            $form_id,
            $model,
            'faculty',
            'student',
            'phd_coordinator'
        );
    }

    private function coordinatorSubmit($user, $request, $form_id)
    {
        $model = ThesisExtentionForm::class;
      
        return $this->submitForm(
            $user,
            $request,
            $form_id,
            $model,
            'phd_coordinator',
            'faculty',
            'hod',
        );
    }

    private function hodSubmit($user, $request, $form_id)
    {
        $model = ThesisExtentionForm::class;
        return $this->submitForm(
            $user,
            $request,
            $form_id,
            $model,
            'hod',
            'phd_coordinator',
            'dra',
        );
    }

    private function draSubmit($user, $request, $form_id)
    {
        $model = ThesisExtentionForm::class;
        return $this->submitForm(
            $user,
            $request,
            $form_id,
            $model,
            'dra',
            'hod',
            'dordc',
        );
    }

    //TODO: implement Thesis extention checks of director and male female

    private function dordcSubmit($user, $request, $form_id)
    {
        $model = ThesisExtentionForm::class;
        return $this->submitForm(
            $user,
            $request,
            $form_id,
            $model,
            'dordc',
            'dra',
            'dordc',
            function ($formInstance) use ($request, $user) {
                if ($request->approval) {
                    $formInstance->completion='complete';
                    $formInstance->status = 'approved';
                    $formInstance->addHistoryEntry("Thesis approved by DORDC", $user->name());
                }
            }
        );
    }

    private function directorSubmit($user, $request, $form_id)
    {
        $model = ThesisExtentionForm::class;
        return $this->submitForm(
            $user,
            $request,
            $form_id,
            $model,
            'director',
            'dordc',
            'dra',
            function ($formInstance) use ($request, $user) {
                if ($request->approval) {
                    $formInstance->completion='complete';
                    $formInstance->status = 'approved';
                    $formInstance->addHistoryEntry("Thesis Extention approved by Director", $user->name());
                }
            }
        );
    }

}
