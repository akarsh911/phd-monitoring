<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Traits\GeneralFormCreate;
use App\Http\Controllers\Traits\GeneralFormHandler;
use App\Http\Controllers\Traits\GeneralFormList;
use App\Http\Controllers\Traits\GeneralFormSubmitter;
use App\Models\ConstituteOfIRB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Faculty;
use App\Models\Forms;
use App\Models\irbExpertChairman;
use App\Models\IrbNomineeCognate;
use App\Models\IrbOutsideExpert;
use App\Models\OutsideExpert;

//TODO: add outside expert not in the system


class ConstituteOfIRBController extends Controller
{
    use GeneralFormHandler;
    use GeneralFormSubmitter;
    use GeneralFormList;
    use GeneralFormCreate;

    public function listForm(Request $request, $student_id=null)
    {
       $user = Auth::user();
       if($student_id)
         return $this->listFormsStudent($user, ConstituteOfIRB::class, $student_id);
       return $this->listForms($user, ConstituteOfIRB::class);
    }

    public function createForm(Request $request)
    {
        $user = Auth::user();
        $role = $user->role;
        $steps = [
            'student',
            'faculty',
            'hod',
            'dordc',
        ];
        if($role->role != 'student'){
            return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }
        $data=[
            'roll_no'=>$user->student->roll_no,
            'steps'=>$steps,
            'role'=>$role->role,
            'name'=>$user->first_name.' '.$user->last_name
        ];
        return $this->createForms(ConstituteOfIRB::class, $data);
    }

    public function loadForm(Request $request, $form_id=null)
    {
        $user = Auth::user();
        $role = $user->role;
        $model = ConstituteOfIRB::class;
        $steps=[
            'student',
            'faculty',
            'hod',
            'dordc'
        ];
        switch ($role->role) {
            case 'student':
                return $this->handleStudentForm($user, $form_id, $model,$steps);
            case 'hod':
                return $this->handleHodForm($user, $form_id, $model);
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
            case 'dordc':
                return $this->dordcSubmit($user, $request, $form_id);
            default:
                return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }
    }

    private function studentSubmit($user, Request $request, $form_id)
    {
        $request->validate([
            'semester' => 'required|integer',
        ]);
        return $this->submitForm($user,$request, $form_id, ConstituteOfIRB::class, 'student','student','faculty',  function ($formInstance) use ($request, $user) {
            $formInstance->update([
                'semester' => $request->semester,
            ]);
        });
    }

    private function supervisorSubmit($user, Request $request, $form_id)
    {
        $request->validate([
            'nominee_cognates' => 'array|nullable',
        ]);
    
        return $this->submitForm($user,$request, $form_id, ConstituteOfIRB::class, 'faculty','student','hod', function ($formInstance) use ($request, $user) {
            // Check if nominee cognates are valid
            $nomineeCognates = $request->nominee_cognates;
            if (!$nomineeCognates) {
                throw new \Exception('Nominee cognates are required');
            }
            // Ensure there are exactly 3 nominee cognates
            if (count($nomineeCognates) != 3) {
                throw new \Exception('Exactly 3 nominee cognates are required');
            }
    
            // Check if all nominee cognates are different
            $uniqueNomineeCognates = array_unique($nomineeCognates);
            if (count($uniqueNomineeCognates) != 3) {
                throw new \Exception('Nominee cognates must be unique');
            }
    
            // Check if all nominee cognates are valid faculty
            foreach ($nomineeCognates as $nomineeCognate) {
                $faculty = Faculty::find($nomineeCognate);
                if (!$faculty) {
                    throw new \Exception('Invalid faculty code');
                }
                if($formInstance->student->checkSupervises($nomineeCognate)){
                    throw new \Exception('Supervisor can not be a nominee cognate');
                }
                if($faculty->department_id != $formInstance->student->department_id){
                    throw new \Exception('Nominee cognates must be from the same department');
                }
            }
            $oldNomineeCognates=IrbNomineeCognate::where('irb_form_id',$formInstance->id)->get();
            if(count($oldNomineeCognates) != 0){
                foreach($oldNomineeCognates as $oldNomineeCognate){
                    $oldNomineeCognate->delete();
                }
                $formInstance->addHistoryEntry("Supervisor changed nominee cognates", $user->name());
            }
            
            foreach ($nomineeCognates as $nomineeCognate) {
                IrbNomineeCognate::create([
                    'irb_form_id' => $formInstance->id,
                    'nominee_id' => $nomineeCognate,
                    'supervisor_id' => $user->faculty->faculty_code,
                ]);
            }

            // Update the form instance and create a supervisor approval record
    
        });
    }
    
    private function hodSubmit($user, Request $request, $form_id)
    {
        
        return $this->submitForm(
            $user, 
            $request, 
            $form_id, 
            ConstituteOfIRB::class, 
            'hod', 
            'faculty', 
            'dordc', 
            function ($formInstance, $user) use ($request) {
                $request->validate([
                    'chairman_experts' => 'array|required',
                    'outside_experts' => 'array|required',
                    'outside_experts.*.first_name' => 'string|required_with:outside_experts',
                    'outside_experts.*.last_name' => 'string|required_with:outside_experts',
                    'outside_experts.*.designation' => 'string|required_with:outside_experts',
                    'outside_experts.*.institution' => 'string|required_with:outside_experts',
                    'outside_experts.*.email' => 'email|required_with:outside_experts',
                    'outside_experts.*.phone' => 'string|required_with:outside_experts',
                    'outside_experts.*.department' => 'string|required_with:outside_experts',
                ]);

                if(!$request->chairman_experts || !$request->outside_experts){
                    throw new \Exception('Chairman Experts and Outside Experts are Required');
                }
                // Handling cognate experts
                $oldChairmanExperts=irbExpertChairman::where('irb_form_id',$formInstance->id)->get();
                if(count($oldChairmanExperts) != 0){
                    foreach($oldChairmanExperts as $oldChairmanExpert){
                        $oldChairmanExpert->delete();
                    }
                    $formInstance->addHistoryEntry("HOD changed cognate experts", $user->name());
                }
                foreach ($request->chairman_experts as $chairmanExpert) {
                    $faculty = Faculty::where('faculty_code', $chairmanExpert)->first();
                    if ($faculty) {
                        if($formInstance->student->checkSupervises($faculty->faculty_code)){
                            throw new \Exception('Supervisor can not be a cognate expert');
                        }
                        if($formInstance->student->department_id != $faculty->department_id){
                            throw new \Exception('Cognate experts must be from the same department');
                        }
                        irbExpertChairman::create([
                            'irb_form_id' => $formInstance->id,
                            'expert_id' => $chairmanExpert,
                        ]);
                    }
                    else{
                        throw new \Exception('Invalid faculty code');
                    }
                }
                $formInstance->addHistoryEntry("HOD added cognate experts", $user->name());
    
                // Handling outside experts
                $oldOutsideExperts=IrbOutsideExpert::where('irb_form_id',$formInstance->id)->get();
                if(count($oldOutsideExperts) != 0){
                    foreach($oldOutsideExperts as $oldOutsideExpert){
                        $oldOutsideExpert->delete();
                    }
                    $formInstance->addHistoryEntry("HOD changed outside experts", $user->name());
                }

                foreach ($request->outside_experts as $outsideExpert) {
                    if (array_key_exists('expert_id', $outsideExpert) && $outsideExpert['expert_id'] != null) {
                        IrbOutsideExpert::create([
                            'irb_form_id' => $formInstance->id,
                            'expert_id' => $outsideExpert['expert_id'],
                            'hod_id' => $user->id,
                        ]);
                    } else {
                        // Create new expert and link
                        // $expert = OutsideExpert::create([
                        //     'first_name' => $outsideExpert['first_name'],
                        //     'last_name' => $outsideExpert['last_name'],
                        //     'designation' => $outsideExpert['designation'],
                        //     'institution' => $outsideExpert['institution'],
                        //     'email' => $outsideExpert['email'],
                        //     'phone' => $outsideExpert['phone'],
                        //     'department' => $outsideExpert['department'],
                        // ]);
                        // IrbOutsideExpert::create([
                        //     'irb_form_id' => $formInstance->id,
                        //     'expert_id' => $expert->id,
                        //     'hod_id' => $user->id,
                        // ]);
                    }
                }
                $formInstance->addHistoryEntry("HOD added outside experts", $user->name());
        
             
            }
        );
    }
    
    

    private function dordcSubmit($user, Request $request, $form_id)
    {
        return $this->submitForm(
            $user, 
            $request, 
            $form_id, 
            ConstituteOfIRB::class, 
            'dordc', 
            'hod', 
            'dra',
            function ($formInstance, $user) use ($request) {
                    $request->validate([
                        'outside_expert' =>"integer|nullable",
                        'cognate_expert' => 'integer|nullable',
                    ]);
                    if ($formInstance->dra_lock) {
                        throw new \Exception('Form is unavailable for submission');
                    }

                    $outsideExpertId = $request->outside_expert;
                    $cognateExpertId = $request->cognate_expert;

                    $outsideExpert = IrbOutsideExpert::where('irb_form_id', $formInstance->id)->where('expert_id', $outsideExpertId)->first();
                    $cognateExpert = irbExpertChairman::where('irb_form_id', $formInstance->id)->where('expert_id', $cognateExpertId)->first();
                    if(!$outsideExpert || !$cognateExpert) {
                        throw new \Exception('Invalid expert selection');
                    }

                    $formInstance->update([
                        'outside_expert' => $outsideExpertId,
                        'cognate_expert' => $cognateExpertId,
                        'completion'=>true
                    ]);

                    $forms = [
                        [
                            'form_type' => 'irb-submission',
                            'form_name' => 'IRB Submission',
                            'max_count' => 1,
                            'stage' => 'student',
                        ],
                        [
                            'form_type' => 'irb-extension',
                            'form_name' => 'IRB Extension',
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
            });
    }

}
