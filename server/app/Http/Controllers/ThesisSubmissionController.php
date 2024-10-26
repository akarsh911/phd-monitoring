<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Traits\GeneralFormHandler;
use App\Http\Controllers\Traits\GeneralFormList;
use App\Http\Controllers\Traits\GeneralFormSubmitter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Traits\SaveFile;
use App\Models\Patent;
use App\Models\Publication;
use App\Models\ThesisSubmission;

class ThesisSubmissionController extends Controller
{
    use GeneralFormHandler;
    use GeneralFormSubmitter;
    use GeneralFormList;
    use SaveFile;

    public function listForm(Request $request, $student_id = null)
    {
        $user = Auth::user();
        return $this->listForms($user, ThesisSubmission::class);
    }

    
    public function loadForm(Request $request, $form_id=null)
    {
        $user = Auth::user();
        $role = $user->role;
        $model = ThesisSubmission::class;
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
        $model = ThesisSubmission::class;

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
                    'date_of_synopsis' => 'required|date',
                    'reciept_no' => 'required|string',
                    'date_of_fee_submission' => 'required|date',
                    'thesis_pdf' => 'required|file|mimes:pdf|max:2048',
                    'publications' => 'required|array',
                    'patents' => 'required|array',
                ]);
                $formInstance->date_of_synopsis = $request->date_of_synopsis;
                $formInstance->reciept_no = $request->reciept_no;
                $formInstance->date_of_fee_submission = $request->date_of_fee_submission;
                $formInstance->thesis_pdf = $this->saveUploadedFile($request->file('thesis_pdf'), 'thesis', $user->student->roll_no);
               
                $oldPublications = $formInstance->publications;
                if($oldPublications){
                    foreach ($oldPublications as $oldPublication) {
                        $oldPublication->delete();
                    }
                }
                $oldPatents = $formInstance->patents;
                if($oldPatents){
                    foreach ($oldPatents as $oldPatent) {
                        $oldPatent->delete();
                    }
                }
                if(count($request->publications) != 0){
                 
                foreach ($request->publications as $publication) {
                    $publication = Publication::find($publication);
                    if (!$publication) {
                        throw new \Exception("Invalid publication selected");
                    }
                    if($publication->student_id != $user->student->roll_no){
                        throw new \Exception("Invalid publication selected");
                    }
                    $newPublication = $publication->replicate();
                    $newPublication->form_id = $formInstance->id;
                    $newPublication->form_type = 'thesis';
                    $newPublication->save();
                   
                }
            }
            if(count($request->patents) != 0){
                foreach ($request->patents as $patent) {
                    $patent = Patent::find($patent);
                    if (!$patent) {
                        throw new \Exception("Invalid patent selected");
                    }
                    if($patent->student_id != $user->student->roll_no){
                        throw new \Exception("Invalid patent selected");
                    }
                    $newPatent = $patent->replicate();
                    $newPatent->form_id = $formInstance->id;
                    $newPatent->form_type = 'thesis';
                    $newPatent->save();

                }
                
            }
        }
        );
    }
    private function supervisorSubmit($user, $request, $form_id)
    {
        $model = ThesisSubmission::class;
        return $this->submitForm(
            $user,
            $request,
            $form_id,
            $model,
            'faculty',
            'student',
            'phd_coordinator',
        );
    }

    private function coordinatorSubmit($user, $request, $form_id)
    {
        $model = ThesisSubmission::class;
      
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
        $model = ThesisSubmission::class;
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
        $model = ThesisSubmission::class;
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


    private function dordcSubmit($user, $request, $form_id)
    {
        $model = ThesisSubmission::class;
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
}
