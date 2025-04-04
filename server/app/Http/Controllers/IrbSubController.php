<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Traits\GeneralFormCreate;
use App\Http\Controllers\Traits\GeneralFormHandler;
use App\Http\Controllers\Traits\GeneralFormList;
use App\Http\Controllers\Traits\GeneralFormSubmitter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\IrbSubForm;
use App\Http\Controllers\Traits\SaveFile;
use App\Models\Approval;
use App\Models\DoctoralCommittee;
use App\Models\Faculty;
use App\Models\Forms;
use App\Models\PHDObjective;
use App\Models\User;
use App\Services\EmailService;

class IrbSubController extends Controller
{
    use GeneralFormHandler;
    use GeneralFormSubmitter;
    use GeneralFormList;
    use SaveFile;
    use GeneralFormCreate;
    
    protected $emailService;
    
    public function __construct(EmailService $emailService)
    {
        $this->emailService = $emailService;
    }

    public function listForm(Request $request, $student_id=null)
    {
       $user = Auth::user();
       if($student_id)
         return $this->listFormsStudent($user, IrbSubForm::class, $student_id);
       return $this->listForms($user, IrbSubForm::class);
    }

    public function createForm(Request $request)
    {
        $user = Auth::user();
        $role = $user->current_role;
        $steps=['student','faculty','hod','dordc','complete'];
        if($role->role != 'student'){
            return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }
        $data=[
            'roll_no'=>$user->student->roll_no,
            'steps'=>$steps,
            'role'=>$role->role,
            'name'=>$user->first_name.' '.$user->last_name
        ];
        return $this->createForms(IrbSubForm::class, $data);
    }


    public function loadForm(Request $request, $form_id=null)
    {
        $user = Auth::user();
        $role = $user->current_role;
        $model = IrbSubForm::class;
        $steps=['student','faculty','external','hod','dra','dordc'];
        switch ($role->role) {
            case 'student':
                return $this->handleStudentForm($user, $form_id, $model,$steps);
            case 'hod':
                return $this->handleHodForm($user, $form_id, $model);
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
        $role = $user->current_role;

        switch ($role->role) {
            case 'student':
                return $this->studentSubmit($user, $request, $form_id);
            case 'faculty':
                return $this->supervisorSubmit($user, $request, $form_id);
            case 'hod':
                return $this->hodSubmit($user, $request, $form_id);
            case 'dordc':
                return $this->dordcSubmit($user, $request, $form_id);
            default:
                return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }
    }

    private function studentSubmit($user, $request, $form_id)
    {
        $request->validate([
            'revised_phd_objectives' => 'required|array',
            'revised_phd_title' => 'required|string',
            'irb_pdf' => 'required|file|mimes:pdf|max:2048',
            'date_of_irb' => 'required|string',
        ]);

        $model = IrbSubForm::class;

        return $this->submitForm($user, $request, $form_id, $model,'student', 'student','faculty',
        function ($formInstance) use ($request, $user) {
        
            $link=$this->saveUploadedFile($request->file('irb_pdf'), 'irb_sub_rev', $user->student->roll_no);
          
                $formInstance->revised_phd_title = $request->revised_phd_title;
                $formInstance->revised_irb_pdf = $link;
                $formInstance->date_of_irb = $request->date_of_irb;
                $formInstance->student->date_of_irb = $request->date_of_irb;
                $formInstance->student->save();
                $objectives = $request->revised_phd_objectives;
          
               
                $formInstance->student->objectives()->where('type', 'revised')->delete();
                foreach ($objectives as $objective) {
                   PHDObjective::create([
                        'student_id' => $formInstance->student->roll_no,
                        'objective' => $objective,
                        'type' => 'revised',
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
        return $this->submitForm($user, $request, $form_id, $model, 'faculty', 'student', 'external',
        function ($formInstance) use ($request, $user) {
            $this->handleSupervisorSubmitForm($user, $request, $formInstance);
        });
    }   

    

    private function hodSubmit($user, $request, $form_id)
    {
        $model = IrbSubForm::class;
        return $this->submitForm($user, $request, $form_id, $model, 'hod', 'faculty', 'dordc');
    }

    private function dordcSubmit($user, $request, $form_id)
    {
        $model = IrbSubForm::class;
        return $this->submitForm($user, $request, $form_id, $model, 'dordc', 'dra', 'complete', function ($formInstance) use ($request, $user) {
            if($formInstance->form_type=='draft'){
                $formInstance->form_type = 'revised';
                $formInstance->stage = 'student';
                $formInstance->addHistoryEntry("Form Approved By DORDC and Sent For Revision", $user->name());
                $formInstance->student_lock = false;
                $formInstance->dordc_lock = true;
                $steps=['student','faculty','external','hod','dra','dordc','complete'];
                $formInstance->steps=$steps;
                $formInstance->save();
                throw new \Exception('Form Approved and sent For Revision ', 201);
            }
            else{
               $formInstance->completion='complete';
               $formInstance->status='approved';
               $forms = [
                [
                    'form_type' => 'synopsis-submission',
                    'form_name' => 'Synopsis Submission',
                    'max_count' => 1,
                    'stage' => 'student',
                ],
                [
                    'form_type' => 'thesis-submission',
                    'form_name' => 'Thesis Submission',
                    'max_count' => 1,
                    'stage' => 'student',
                ],
                [
                    'form_type' => 'thesis-extension',
                    'form_name' => 'Thesis Extension',
                    'max_count' => 10,
                    'stage' => 'student',
                ],
            ];
            $student = $formInstance->student;
            foreach ($forms as $form) {
                $existingForm = Forms::where('student_id', $student->roll_no)
                    ->where('form_type', $form['form_type'])
                    ->first();

                if (!$existingForm) {
                    Forms::create([
                        'student_id' => $student->roll_no,
                        'department_id' => $student->department_id,
                        'count' => 0,
                        'student_available' => true,
                        'form_type' => $form['form_type'],
                        'form_name' => $form['form_name'],
                        'max_count' => $form['max_count'],
                        'stage' => $form['stage'],
                    ]);
                }
                
            }
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
                $request->validate([
                    'supervised_outside' => 'required|integer',
                ]);
                $faculty=$user->faculty;
                $faculty->supervised_outside=$request->supervised_outside;
                $supervised_campus = Faculty::where('faculty_code', $faculty_code)
                ->whereHas('supervisedStudents', function ($query) {
                    // Use a raw query to directly check the completion status
                    $query->whereHas('irbSubForm', function ($subQuery) {
                        $subQuery->where('status', 'approved')
                                  ->where('status', 'complete');
                    });
                });            
                $faculty->supervised_campus=$supervised_campus->count();
                $faculty->save();
            
           

            $formInstance->supervisorApprovals()->where('supervisor_id', $faculty_code)->update([
              'status' => 'approved',
            ]);
            
            $formInstance->addHistoryEntry("Supervisor Approved The Form", $user->name());
    
            $approvals=$formInstance->supervisorApprovals()->where('status','approved')->get();
           
            if($approvals->count()!=$formInstance->student->supervisors->count()){
                throw new \Exception('Your Prefrences Saved, Form Will be submitted once all Supervisors approve',201);
            }
            else{
                //send Email with accept reject link
                $outside=DoctoralCommittee::where('student_id',$formInstance->student->roll_no)->first();
                $faculty_code=$outside->faculty_id;
                $facultyw=Faculty::where('faculty_code',$faculty_code)->first();
                $userF = $facultyw->user;

                $approval = Approval::create([
                    'key' => Approval::generateKey(),
                    'email' => $userF->email,
                    'action' => 'review',
                    'model_type' => get_class($formInstance),
                    'model_id' => $formInstance->id,
                ]);
                $link= storage_path($formInstance->revised_irb_pdf);
                $success = $this->emailService->sendEmail(
                    $userF->email,
                    'approval',  // Use the Blade template 'emails/approval.blade.php'
                    [
                        'name' => $userF->name(),
                        'email' => $userF->email,
                        'approverName' => $user->name(),
                        'formId' => $formInstance->id,
                        'approvalKey' => $approval->key,
                    ],
                    false,                               // Scheduled email
                    '',             // Set desired schedule time
                    "IRB Submission Approval Request" ,
                    [$link]
                );
            
                if ($success) {
                    return response()->json(['success' => true, 'message' => 'Approval email sent successfully.']);
                } else {
                    return response()->json(['success' => false, 'message' => 'Failed to send approval email.']);
                }

            }
        }
        else{
            $formInstance->supervisorApprovals()->where('supervisor_id', $faculty_code)->update([
              'status' => 'rejected',
            ]);
        }
    }
}