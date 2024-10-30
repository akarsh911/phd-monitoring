<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Traits\GeneralFormCreate;
use Illuminate\Http\Request;

use App\Http\Controllers\Traits\GeneralFormHandler;
use App\Http\Controllers\Traits\GeneralFormList;
use App\Http\Controllers\Traits\GeneralFormSubmitter;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Traits\SaveFile;
use App\Models\Patent;
use App\Models\Publication;
use App\Models\SynopsisObjectives;
use App\Models\SynopsisSubmission;

class SynopsisSubmissionController extends Controller
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
         return $this->listFormsStudent($user, SynopsisSubmission::class, $student_id);
       return $this->listForms($user, SynopsisSubmission::class);
    }

    public function createForm(Request $request)
    {
        $user = Auth::user();
        $role = $user->role;
        $steps=['student','faculty','phd_coordinator','hod','dra','dordc','director','complete'];
        if($role->role != 'student'){
            return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }
        $data=[
            'roll_no'=>$user->student->roll_no,
            'steps'=>$steps,
            'role'=>$role->role,
            'name'=>$user->first_name.' '.$user->last_name
        ];
        return $this->createForms(SynopsisSubmission::class, $data);
    }

    
    public function loadForm(Request $request, $form_id=null)
    {
        $user = Auth::user();
        $role = $user->role;
        $model = SynopsisSubmission::class;
        $steps=['student','faculty','phd_coordinator','hod','dra','dordc','director'];
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
        $model = SynopsisSubmission::class;
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
                   'revised_title' => 'string',
                   'objectives' => 'array',
                   'objectives.*' => 'string',
                   'patents' => 'array',
                   'publications' => 'array',
                   'patents.*' => 'integer',
                   'publications.*' => 'integer',
                   'synopsis_pdf' => 'required|file|mimes:pdf|max:2048',
                ]);
                $formInstance->revised_title = $request->revised_title;
                $link=$this->saveUploadedFile($request->file('synopsis_pdf'), 'synopsis', $user->student->roll_no);
                $formInstance->synopsis_pdf = $link;
                $oldObjectives = $formInstance->objectives;
                if($oldObjectives->count() > 0){
                    $formInstance->objectives()->delete();
                }
               
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
              if($request->objectives){
                foreach ($request->objectives as $objective) {
                    $newObjective = new SynopsisObjectives();
                    $newObjective->objective = $objective;
                    $newObjective->synopsis_id = $formInstance->id;
                    $newObjective->save();
                }
            }
            if($request->publications){
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
                    $newPublication->form_type = 'synopsis';
                    $newPublication->save();
                   
                }
            }
            if($request->patents){
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
                    $newPatent->form_type = 'synopsis';
                    $newPatent->save();

                }
            }
              
             
            }
        );
    }
    private function supervisorSubmit($user, $request, $form_id)
    {
        $model = SynopsisSubmission::class;
        return $this->submitForm(
            $user,
            $request,
            $form_id,
            $model,
            'faculty',
            'student',
            'phd_coordinator',
            function ($formInstance) use ($request, $user) {
               $request->validate([
                   'current_progress' => 'integer',
                ]);
                $formInstance->current_progress = $request->current_progress;
                $oldProgress=$formInstance->student->overall_progress;
                $formInstance->total_progress = $oldProgress + $request->current_progress;
            }
        );
    }

    private function coordinatorSubmit($user, $request, $form_id)
    {
        $model = SynopsisSubmission::class;
      
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
        $model = SynopsisSubmission::class;
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
        $model = SynopsisSubmission::class;
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
        $model = SynopsisSubmission::class;
        return $this->submitForm(
            $user,
            $request,
            $form_id,
            $model,
            'dordc',
            'dra',
            'director',
        );
    }

    private function directorSubmit($user, $request, $form_id)
    {
        $model = SynopsisSubmission::class;
        return $this->submitForm(
            $user,
            $request,
            $form_id,
            $model,
            'director',
            'dordc',
            'complete',
            function ($formInstance) use ($request, $user) {
                if ($request->approval) {
                    $formInstance->completion='complete';
                    $formInstance->status = 'approved';
                    $formInstance->student->phd_title=$formInstance->revised_title;
                    $formInstance->student->save();
                    $formInstance->student->overall_progress=$formInstance->total_progress;
                    $formInstance->student->save();
                    $formInstance->addHistoryEntry("Synopsis approved by Director", $user->name());
                }

            }
        );
    }


}
