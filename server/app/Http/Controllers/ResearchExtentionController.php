<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Traits\GeneralFormCreate;
use App\Http\Controllers\Traits\GeneralFormHandler;
use App\Http\Controllers\Traits\GeneralFormList;
use App\Http\Controllers\Traits\GeneralFormSubmitter;
use App\Http\Controllers\Traits\SaveFile;
use App\Models\ResearchExtentionsForm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class ResearchExtentionController extends Controller
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
         return $this->listFormsStudent($user, ResearchExtentionsForm::class, $student_id);
       return $this->listForms($user, ResearchExtentionsForm::class);
    }

    public function createForm(Request $request)
    {
        $user = Auth::user();
        $role = $user->role;
        $steps=[
            'student',
            'faculty',
            'phd_coordinator',
            'hod',
            'dra',
            'dordc',
        ];
        if($role->role != 'student'){
            return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }
        $changes=$user->student->researchExtentions();
        if($changes->count()>0){
            $steps=[
                'student',
                'faculty',
                'phd_coordinator',
                'hod',
                'dra',
                'dordc',
                'director'
            ];
        }
        $data=[
            'roll_no'=>$user->student->roll_no,
            'steps'=>$steps,
            'role'=>$role->role,
            'name'=>$user->first_name.' '.$user->last_name
        ];
        return $this->createForms(ResearchExtentionsForm::class, $data);
    }

    public function loadForm(Request $request, $form_id=null)
    {
        $user = Auth::user();
        $role = $user->role;
        $model = ResearchExtentionsForm::class;
        $steps=[
            'student',
            'faculty',
            'phd_coordinator',
            'hod',
            'dra',
            'dordc',
            'director'
        ];
        switch ($role->role) {
            case 'student':
                return $this->handleStudentForm($user, $form_id, $model,$steps);
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

    private function studentSubmit($user,$request,$form_id){
        $model = ResearchExtentionsForm::class;
        return $this->submitForm($user, $request, $form_id, $model, 'student', 'student', 'faculty',
        function ($formInstance) use ($request, $user) {
            $request->validate([
                'reason' => 'required|string',
                'duration' => 'nullable|integer',
                'research_pdf' => 'required|file|mimes:pdf|max:2048',
            ]);
            $formInstance->reason = $request->reason;
            if($request->has('duration')){
                $formInstance->duration = $request->duration;
            }
            $filePath=$this->saveUploadedFile($request->file('research_pdf'), 'research_extentions', $user->student->roll_no);
            $formInstance->research_pdf = $filePath;
        });
    }

    private function supervisorSubmit($user, $request, $form_id)
    {
        $model = ResearchExtentionsForm::class;
        return $this->submitForm($user, $request, $form_id, $model, 'faculty', 'student', 'phd_coordinator');
    }

    private function coordinatorSubmit($user, $request, $form_id)
    {
        $model = ResearchExtentionsForm::class;
        return $this->submitForm($user, $request, $form_id, $model, 'phd_coordinator', 'faculty', 'hod');
    }

    private function hodSubmit($user, $request, $form_id)
    {
        $model = ResearchExtentionsForm::class;
        return $this->submitForm($user, $request, $form_id, $model, 'hod', 'phd_coordinator', 'dra');
    }

    private function draSubmit($user, $request, $form_id)
    {
        $model = ResearchExtentionsForm::class;
        return $this->submitForm($user, $request, $form_id, $model, 'dra', 'hod', 'dordc');
    }

    private function dordcSubmit($user, $request, $form_id)
    {
        $model = ResearchExtentionsForm::class;
        $form=ResearchExtentionsForm::find($form_id);
        $prevExtentions=$form->student->researchExtentions();
        if($prevExtentions->count()>0)
        return $this->submitForm($user, $request, $form_id, $model, 'dordc', 'dra', 'director',
        function ($formInstance) use ($request, $user) {
            $formInstance->status='approved';
            $formInstance->completion='completed';
            $formInstance->student->researchExtentions()->create([
                'period_of_extension'=>$formInstance->duration,
                'research_pdf'=>$formInstance->research_pdf,
                'reason'=>$formInstance->reason,
                'research_extentions_id'=>$formInstance->id
            ]);
            $formInstance->addHistoryEvent('Form Approved by DORDC', $user->name());
        });
        else
        return $this->submitForm($user, $request, $form_id, $model, 'dordc', 'dra', 'director');
    }

    private function directorSubmit($user, $request, $form_id)
    {
        $model = ResearchExtentionsForm::class;
        return $this->submitForm($user, $request, $form_id, $model, 'director', 'dordc', 'dordc',
        function ($formInstance) use ($request, $user) {
            $formInstance->status='approved';
            $formInstance->completion='completed';
            $formInstance->student->researchExtentions()->create([
                'period_of_extension'=>$formInstance->duration,
                'research_pdf'=>$formInstance->research_pdf,
                'reason'=>$formInstance->reason,
                'research_extentions_id'=>$formInstance->id
            ]);
            $formInstance->addHistoryEvent('Form Approved by Director', $user->name());
        });
    }

}