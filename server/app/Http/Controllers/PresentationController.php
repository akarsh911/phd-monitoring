<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Http\Controllers\Traits\GeneralFormHandler;
use App\Http\Controllers\Traits\GeneralFormList;
use App\Http\Controllers\Traits\GeneralFormSubmitter;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Traits\SaveFile;

use App\Models\Patent;
use App\Models\Presentation;
use App\Models\PresentationReview;
use App\Models\Publication;

class PresentationController extends Controller{
    use GeneralFormHandler;
    use GeneralFormSubmitter;
    use GeneralFormList;
    use SaveFile;

    public function listForm(Request $request, $student_id = null)
    {
        $user = Auth::user();
        return $this->listForms($user, Presentation::class);
    }

    public function createForm(Request $request)
    {
      //schedule a presentation
    }
    
    public function loadForm(Request $request, $form_id=null)
    {
        $user = Auth::user();
        $steps=['student','faculty','doctoral','hod','dra','dordc'];
        $model = Presentation::class;
        $form=Presentation::find($form_id);
        $role = $user->role;
        $cur=$role->role;
        if($form)
        {
            if($form->student->checkDoctoralCommittee($user->faculty?->faculty_code)){
                $cur='doctoral';
            }
        }
    
        switch ($cur) {
            case 'student':
                return $this->handleStudentForm($user, $form_id, $model,$steps);
            case 'hod':
                return $this->handleHodForm($user, $form_id, $model);
            case 'doctoral':
                return $this->handledoctoralForm($user, $form_id, $model);
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
        $form=Presentation::find($form_id);
        $cur=$role->role;
        if($form)
        {
            if($form->student->checkDoctoralCommittee($user->faculty?->faculty_code)){
                $cur='doctoral';
            }
        }
        switch ($cur) {
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
            case 'doctoral':
                return $this->doctoralSubmit($user, $request, $form_id);
            default:
                return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }
    }


    private function studentSubmit($user, $request, $form_id)
    {
        $model = Presentation::class;

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
                    'publications' => 'required|array',
                    'patents' => 'required|array',
                    'publications.*' => 'required|integer',
                    'patents.*' => 'required|integer',
                    'teaching_work'=>'required| in:UG,PG,Both,None',
                    'no_paper_sci_journal'=>'required|integer',
                    'no_paper_scopus_journal'=>'required|integer',
                    'no_paper_conference'=>'required|integer',
                    'presentation_pdf'=>'required|file|mimes:pdf|max:2048',
                ]);

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

                $formInstance->teaching_work=$request->teaching_work;
                // $formInstance->no_paper_sci_journal=$request->no_paper_sci_journal;
                // $formInstance->no_paper_scopus_journal=$request->no_paper_scopus_journal;
                // $formInstance->no_paper_conference=$request->no_paper_conference;

                $formInstance->presentation_pdf = $this->saveUploadedFile($request->file('presentation_pdf'), 'presentation_pdf',$user->student->roll_no);

                $sups=$user->student->supervisors;
                foreach($sups as $sup){
                    PresentationReview::create([
                        'presentation_id'=>$formInstance->id,
                        'faculty_id'=>$sup->faculty_code,
                        'comments'=>'',
                        'review_status'=>'pending',
                        'is_supervisor'=>1,
                    ]);
                }

        }
        );
    }

    private function supervisorSubmit($user, $request, $form_id)
    {
        $model = Presentation::class;

        return $this->submitForm(
            $user,
            $request,
            $form_id,
            $model,
            'faculty',
            'doctoral',
            'doctoral',
            function ($formInstance) use ($request, $user) {
                if(!$formInstance->progress&&!$formInstance->attendance&&!$formInstance->contact_hours){
                    $request->validate([
                        'progress' => 'required|integer|min:0|max:100',
                        'attendance' => 'required|numeric|min:0|max:100',
                        'contact_hours' => 'required|integer|min:0',
                    ]);
                    $formInstance->progress = $request->progress;
                    $formInstance->attendance = $request->attendance;
                    $formInstance->contact_hours = $request->contact_hours;
                    $formInstance->current_progress = $formInstance->student->current_progress;
                    $formInstance->total_progress = $formInstance->student->current_progress+$request->progress;
                }
                $alreadyReviewed=PresentationReview::where('presentation_id',$formInstance->id)->where('faculty_id',$user->faculty->faculty_code)->first();
              
                if($alreadyReviewed->review_status=='completed'){
                    throw new \Exception("You have already reviewed this form");
                }

                if($request->approval){
                    PresentationReview::where('presentation_id',$formInstance->id)->where('is_supervisor',1)->where('faculty_id',$user->faculty->faculty_code)
                    ->update(['progress'=>'satisfactory','review_status'=>'completed','comments'=>$request->comments]);
                    $approvals=$formInstance->supervisorReviews->where('is_supervisor',1)->where('review_status','pending');
                   if(count($approvals)!=0){
                      throw new \Exception("Your Prefrences have been saved. Please wait for other supervisors to approve",201);
                   }
                   else{
                     $doctoral=$formInstance->student->doctoralCommittee;
                     foreach($doctoral as $doc){
                        PresentationReview::create([
                            'presentation_id'=>$formInstance->id,
                            'faculty_id'=>$doc->faculty_code,
                            'comments'=>'',
                            'review_status'=>'pending',
                            'is_supervisor'=>0,
                        ]);
                     }
                   }
                }
            }
        );
    }

    private function doctoralSubmit($user, $request, $form_id)
    {
        $model = Presentation::class;
      
        return $this->submitForm(
            $user,
            $request,
            $form_id,
            $model,
            'doctoral',
            'faculty',
            'hod',
            function ($formInstance) use ($request, $user) {
                if(!$formInstance->progress&&!$formInstance->attendance&&!$formInstance->contact_hours){
                    $request->validate([
                        'progress' => 'required|integer|min:0|max:100',
                        'attendance' => 'required|numeric|min:0|max:100',
                        'contact_hours' => 'required|integer|min:0',
                    ]);
                    $formInstance->progress = $request->progress;
                    $formInstance->attendance = $request->attendance;
                    $formInstance->contact_hours = $request->contact_hours;
                    $formInstance->current_progress = $request->student->current_progress;
                    $formInstance->total_progress = $request->student->current_progress+$request->progress;
                }
                $alreadyReviewed=PresentationReview::where('presentation_id',$formInstance->id)->where('is_supervisor',0)->where('faculty_id',$user->faculty->faculty_code)->first();
              
                if($alreadyReviewed->review_status=='completed'){
                    throw new \Exception("You have already reviewed this form");
                }

                if($request->approval){
                    PresentationReview::where('presentation_id',$formInstance->id)->where('faculty_id',$user->faculty->faculty_code)
                    ->update(['progress'=>'satisfactory','review_status'=>'completed','comments'=>$request->comments]);
                    $approvals=$formInstance->supervisorReviews->where('is_supervisor',0)->where('review_status','pending');
                   if(count($approvals)!=0){
                      throw new \Exception("Your Prefrences have been saved. Please wait for other supervisors to approve",201);
                   }
                   else{
                     $doctoral=$formInstance->student->doctoralCommittee;
                     foreach($doctoral as $doc){
                        PresentationReview::create([
                            'presentation_id'=>$formInstance->id,
                            'faculty_id'=>$doc->faculty_code,
                            'comments'=>'',
                            'review_status'=>'pending',
                            'is_supervisor'=>0,
                        ]);
                     }
                   }
                }
            }
        );
    }

    private function hodSubmit($user, $request, $form_id)
    {
        $model = Presentation::class;
        return $this->submitForm(
            $user,
            $request,
            $form_id,
            $model,
            'hod',
            'dra',
            'dra',
        );
    }


    private function dordcSubmit($user, $request, $form_id)
    {
        $model = Presentation::class;
        return $this->submitForm(
            $user,
            $request,
            $form_id,
            $model,
            'dordc',
            'dra',
            'dra',
            function ($formInstance) use ($request, $user) {
                if ($request->approval) {
                    $formInstance->completion='complete';
                    $formInstance->status = 'approved';
                    $formInstance->addHistoryEntry("Thesis approved by DORDC", $user->name());
                }
            }
        );
    }


    private function draSubmit($user, $request, $form_id)
    {
        $model = Presentation::class;
        return $this->submitForm(
            $user,
            $request,
            $form_id,
            $model,
            'dra',
            'dordc',
            'dra',
            function ($formInstance) use ($request, $user) {
                $formInstance->status = 'approved';
                $formInstance->completion='complete';
                $formInstance->student->current_progress=$formInstance->total_progress;
                $formInstance->student->save();
                $formInstance->addHistoryEntry("Presentation marked as completed by DRA", $user->name());
            }
        );
    }

}
