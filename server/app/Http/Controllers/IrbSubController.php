<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Traits\GeneralFormHandler;
use App\Http\Controllers\Traits\GeneralFormSubmitter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\IrbSubForm;
use App\Http\Controllers\Traits\SaveFile;
use App\Models\Faculty;
use App\Models\Supervisor;

class IrbSubController extends Controller
{
    use GeneralFormHandler;
    use GeneralFormSubmitter;
    use SaveFile;

    public function loadForm(Request $request, $form_id=null)
    {
        $user = Auth::user();
        $role = $user->role;
        $model = IrbSubForm::class;
        $steps=['student','faculty','external','hod','dra','dordc'];
        switch ($role->role) {
            case 'student':
                return $this->handleStudentForm($user, $form_id, $model,$steps);
            case 'hod':
                return $this->handleHodForm($user, $form_id, $model);
            case 'dra':
            case 'dordc':
            case 'external':
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
            case 'external':
                return $this->externalSubmit($user, $request, $form_id);
            default:
                return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }
    }

    private function studentSubmit($user, $request, $form_id)
    {
        $request->validate([
            'objectives' => 'required|array',
            'title' => 'required|string',
            'irb_pdf' => 'required|file|mimes:pdf|max:2048',
        ]);

        $model = IrbSubForm::class;

        return $this->submitForm($user, $request, $form_id, $model,'student', 'student','faculty',
        function ($formInstance) use ($request, $user) {
            $type=$formInstance->form_type;
            $link=$this->saveUploadedFile($request->file('irb_pdf'), 'irb_sub', $user->student->roll_no);
            if($type=='draft'){
                $request->validate([
                    'address' => 'required|string',
                ]);
                $formInstance->student->address = $request->address;
                $formInstance->student->save();
                $formInstance->phd_title = $request->title;
                $formInstance->irb_pdf = $link;
            }
            else{
                $formInstance->revised_phd_title = $request->title;
                $formInstance->revised_irb_pdf = $link;
                $request->validate([
                    'date_of_irb' => 'required|string',
                ]);
                $formInstance->date_of_irb = $request->date_of_irb;
                $formInstance->student->date_of_irb = $request->date_of_irb;
                $formInstance->student->save();
            }
            $objectives = $request->objectives;
            if($type=='draft'){
                $formInstance->objectives()->delete();
            }
            foreach ($objectives as $objective) {
                $formInstance->objectives()->create([
                    'objective' => $objective,
                    'type' => $type,
                ]);
            }
            if($formInstance->supervisorApprovals())
            $formInstance->supervisorApprovals()->delete();
            
            $supervisors = $formInstance->student->supervisors;
            foreach ($supervisors as $supervisor) {
                $formInstance->supervisorApprovals()->create([
                    'supervisor_id' => $supervisor->faculty_code,
                    'status' => 'awaited',
                ]);
            }

        });
    }

    private function supervisorSubmit($user, $request, $form_id)
    {
        $model = IrbSubForm::class;
        $form=IrbSubForm::find($form_id);
      
        if($form->form_type=='draft')
        { 

            return $this->submitForm($user, $request, $form_id, $model, 'faculty', 'student', 'hod',
            function ($formInstance) use ($request, $user) {
                $this->handleSupervisorSubmitForm($user, $request, $formInstance);
            });
        }
        else
        return $this->submitForm($user, $request, $form_id, $model, 'faculty', 'student', 'external',
        function ($formInstance) use ($request, $user) {
            $this->handleSupervisorSubmitForm($user, $request, $formInstance);
        });
    }

    private function externalSubmit($user, $request, $form_id)
    {
        $model = IrbSubForm::class;
        return $this->submitForm($user, $request, $form_id, $model, 'external', 'hod', 'faculty');
    }

    private function hodSubmit($user, $request, $form_id)
    {
        $model = IrbSubForm::class;
        return $this->submitForm($user, $request, $form_id, $model, 'hod', 'faculty', 'dra');
    }

    private function draSubmit($user, $request, $form_id)
    {
        $model = IrbSubForm::class;
        return $this->submitForm($user, $request, $form_id, $model, 'dra', 'hod', 'dordc');
    }



    private function dordcSubmit($user, $request, $form_id)
    {
        $model = IrbSubForm::class;
        return $this->submitForm($user, $request, $form_id, $model, 'dordc', 'dra', 'dra', function ($formInstance) use ($request, $user) {
            if($formInstance->form_type=='draft'){
                $formInstance->form_type = 'revised';
                $formInstance->stage = 'student';
                $formInstance->addHistoryEntry("Form Approved By DORDC and Sent For Revision", $user->name());
                $formInstance->student_lock = false;
                $formInstance->dordc_lock = true;
                $formInstance->save();
                throw new \Exception('Form Approved and sent For Revision ', 201);
            }
            else{
               $formInstance->completion='complete';
               $formInstance->status='approved';
            }

        });
    }

    private function handleSupervisorSubmitForm($user, $request, $formInstance)
    {
        $faculty_code = $user->faculty->faculty_code;
        if($request->approval){
            
            if($formInstance->supervisorApprovals()->where('supervisor_id', $faculty_code)->first()->status=='approved'){
                throw new \Exception('You have already approved the form, Can Only Submit once all the supervisors approve');
            }

            if($formInstance->form_type=='draft'){
                $request->validate([
                    'supervised_outside' => 'required|integer',
                ]);
                $faculty=$user->faculty;
                $faculty->supervised_outside=$request->supervised_outside;
                $supervised_campus = Faculty::where('faculty_code', $faculty_code)
                    ->whereHas('supervisedStudents', function ($query) {
                        $query->whereHas('irbSubForms', function ($query) {
                            $query->where('completion', 'complete');
                        });
                    });
                $faculty->supervised_campus=$supervised_campus->count();
                $faculty->save();
            }
           

            $formInstance->supervisorApprovals()->where('supervisor_id', $faculty_code)->update([
              'status' => 'approved',
            ]);
            
            $formInstance->addHistoryEntry("Supervisor Approved The Form", $user->name());
    
            $approvals=$formInstance->supervisorApprovals()->where('status','approved')->get();
           
            if($approvals->count()!=$formInstance->student->supervisors->count()){
                throw new \Exception('Your Prefrences Saved, Form Will be submitted once all Supervisors approve',201);
            }
        }
        else{
            $formInstance->supervisorApprovals()->where('supervisor_id', $faculty_code)->update([
              'status' => 'rejected',
            ]);
        }
    }
}