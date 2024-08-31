<?php

namespace App\Http\Controllers;

use App\Models\IrbForm;
use App\Models\IrbFormObjective;
use App\Models\IrbSubForm;
use App\Models\IrbSupervisorApproval;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class IrbSubFormController extends Controller
{
    public function load(Request $request)
    {
        try{
            $user = Auth::user();
            $role = $user->role->role;

            switch ($role) {
                case 'student':
                    return $this->handleStudentForm($user);
                case 'hod':
                    return $this->handleHodForm($user, $request);
                case 'faculty':
                    return $this->handleFacultyForm($user, $request);
                default:
                    return response()->json(['message' => 'You are not authorized to access this resource'], 403);
            }
    }
    catch(\Exception $e){
        return response()->json(['message' => $e->getMessage()], 400);
    }
    }
    protected function handleStudentForm($user)
    {
        $studentId = $user->student->roll_no;
        // echo $user->student;
        $form = IrbSubForm::where('student_id', $studentId)->first();

        if (!$form) {
            $newForm = new IrbSubForm();
            $newForm->student_id = $studentId;
            $newForm->form_type = 'draft';
            $newForm->save();
            return response()->json($newForm->fullForm($user), 200);
        } else {
            return response()->json($form->fullForm($user), 200);
        }
    }

    protected function handleHodForm($user,$request)
    {
        $request->validate([
            'student_id' => 'required|integer',
        ]);
        $student=Student::find($request->input('student_id'));
        // $formId = $request->input('form_id');
        $form = $student->irbSubForms;      
        if (!$form) {
            return response()->json(['message' => 'Form not found'], 404);
        }
        $student = $form->student;
        if($form->stage=='hod'){
            if ($student->department->id==$user->faculty->department_id)  {
                return response()->json($student->researchExtentionsForm->fullForm($user));
            } else {
                return response()->json(['message' => 'You are not authorized to access this resource'], 403);
            }
        }
        else{
            return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }
    }

    protected function handleFacultyForm($user, $request)
    {
        $request->validate([
            'student_id' => 'required|integer'
        ]);
        $student=Student::find($request->input('student_id'));
        $form=$student->irbForm;
        $formId = $form->id;
        // $form = IrbForm::find($formId);
        if (!$form) {
            return response()->json(['message' => 'Form not found'], 404);
        }
        $student = $form->student;
        if($form->stage=='supervisor'){
            if ($student->checkSupervises($user->faculty->faculty_code)) {
                return response()->json($student->researchExtentionsForm->fullForm($user));
            } else {
                return response()->json(['message' => 'You are not authorized to access this resource'], 403);
            }
        }
        else{
            return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }
    }

    



    public function submit(Request $request)
    {
        try{
            $user = Auth::user();
            $role = $user->role->role;
            switch ($role) {
                case 'student':
                    return $this->submitStudentForm($user, $request);
                case 'hod':
                    return $this->submitHodForm($user, $request);
                case 'faculty':
                    return $this->submitFacultyForm($user, $request);
                case 'dordc':
                        return $this->submitDordcForm($user, $request);
                case 'dra':
                    return $this->submitDraForm($user, $request);
                default:
                    return response()->json(['message' => 'You are not authorized to access this resource'], 403);
            }
        }
        catch(\Exception $e){
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }


    private function submitStudentForm($user, $request)
    {
        $request->validate([
            'phd_title' => 'required|string',
            'irb_pdf' => 'required|string',
            'cgpa' => 'required|numeric',
            'objectives' => 'required|array',
            'date_of_irb' => 'required|string',
            'address' => 'required|string',
        ]);
        $student=Student::findByUserId($user->id);
        
        $form=$student->irbSubForms;
        // echo $form;
        if (!$form) {
            return response()->json(['message' => 'Form not found'], 404);
        }
        if($form->stage!='student')
        {
            return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }

        $form->phd_title = $request->input('phd_title');
        $form->irb_pdf = $request->input('irb_pdf');
        $form->date_of_irb = $request->input('date_of_irb');

        $student->cgpa = $request->input('cgpa');
        $student->address = $request->input('address');
        $student->save();

        foreach ($request->input('objectives') as $objective) {
            $newObjective = new IrbFormObjective();
            $newObjective->objective = $objective;
            $newObjective->type = $form->form_type;
            $newObjective->irb_form_id = $form->id;
            $newObjective->save();
        }
        $form->student_lock = true;
        $form->supervisor_lock=false;
        $form->stage = 'supervisor';
        $form->save();
        return response()->json(['message' => 'Form submitted successfully'], 200);

    }

    private function submitFacultyForm($user,$request)
    {
        $request->validate([
            'student_id' => 'required|integer',
        ]);
        $student=Student::find($request->input('student_id'));
        // $formId = $request->input('form_id');
        $form = $student->irbSubForms;
        if (!$form) {
            return response()->json(['message' => 'Form not found'], 404);
        }
        $student = $form->student;
        $faculty = $user->faculty;
        if($form->stage=='supervisor'){
            if ($student->checkSupervises($user->faculty->faculty_code)) {
                if ($form->supervisor_lock) {
                    return response()->json(['message' => 'Form is unavailable to edit'], 403);
                }
                if (sizeof($form->superVisorApprovals) != sizeof($student->supervisors)) {
                    return response()->json(['message' => 'Approval pending from other supervisors'], 403);
                }
                foreach ($form->superVisorApprovals as $approval) {
                    if ($approval->status == 'awaited' || $approval->status == 'rejected') {
                        return response()->json(['message' => 'Approval pending from other supervisors'], 403);
                    }
                }
                $form->supervisor_lock = true;
                $form->hod_lock = false;
                $form->stage = 'hod';
                $form->save();
                return response()->json(['message' => 'Form submitted successfully'], 200);
            } else {
                return response()->json(['message' => 'You are not authorized to access this resource'], 403);
            }
        }
        else{
            return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }
    }
    private function  submitHodForm($user,$request)
    {
        $request->validate([
            'student_id' => 'required|integer',
        ]);
        $student=Student::find($request->input('student_id'));
        // $formId = $request->input('form_id');
        $form = $student->irbSubForms;
       
        if (!$form) {
            return response()->json(['message' => 'Form not found'], 404);
        }
        $student = $form->student;
        if($form->stage=='hod'){
            if ($student->department->id==$user->faculty->department_id)  {
                if ($form->hod_lock) {
                    return response()->json(['message' => 'Form is unavailable to edit'], 403);
                }
                $form->hod_lock = true;
                $form->dra_lock = false;
                $form->stage = 'dra';
                $form->save();
                return response()->json(['message' => 'Form submitted successfully'], 200);
            } else {
                return response()->json(['message' => 'You are not authorized to access this resource'], 403);
            }
        }
        else{
            return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }
    }
    private function submitDraForm($user,$request)
    {   
        $request->validate([
            'student_id' => 'required|integer',
        ]);
        $student=Student::find($request->input('student_id'));
        // $formId = $request->input('form_id');
        $form = $student->irbSubForms;
        if (!$form) {
            return response()->json(['message' => 'Form not found'], 404);
        }
        $student = $form->student;
        if($form->stage=='dra'){
                if ($form->dra_lock) {
                    return response()->json(['message' => 'Form is unavailable to edit'], 403);
                }
                $form->dra_lock = true;
                $form->dordc_lock = false;
                $form->stage = 'dordc';
                $form->save();
                return response()->json(['message' => 'Form submitted successfully'], 200);
           
        }
        else{
            return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }
    }
    private function submitDordcForm($user,$request)
    {
        $request->validate([
            'student_id' => 'required|integer',
        ]);
        $student=Student::find($request->input('student_id'));
        // $formId = $request->input('form_id');
        $form = $student->irbSubForms;
        if (!$form) {
            return response()->json(['message' => 'Form not found'], 404);
        }
        $student = $form->student;
        if($form->stage=='dordc'){
            if ($form->dordc_lock) {
                return response()->json(['message' => 'Form is unavailable to edit'], 403);
            }
            $form->dordc_lock = true;
            $form->save();
            return response()->json(['message' => 'Form submitted successfully'], 200);
        }
        else{
            return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }
    }
    
    public function update(Request $request)
    {
        try{
            $user = Auth::user();
            $role = $user->role->role;
            switch ($role) {
                case 'faculty':
                    return $this->updateFacultyForm($user, $request);
                case 'dordc':
                        return $this->updateDordcForm($user, $request);
                default:
                    return response()->json(['message' => 'You are not authorized to access this resource'], 403);
                }
            }
            catch(\Exception $e){
                return response()->json(['message' => $e->getMessage()], 400);
            }   
        }
        
        
    
        private function updateFacultyForm($user,$request)
        {
            $request->validate([
                'student_id' => 'required|integer',
                'outside' => 'required|integer',
                'campus' => 'required|integer',
            ]);
    
            $student=Student::find($request->input('student_id'));
            $form = $student->irbSubForms;
            if (!$form) {
                return response()->json(['message' => 'Form not found'], 404);
            }
            $student = $form->student;
            $faculty = $user->faculty;
            if($form->stage=='supervisor'){
                if ($student->checkSupervises($user->faculty->faculty_code)) {
                    if ($form->supervisor_lock) {
                        return response()->json(['message' => 'Form is unavailable to edit'], 403);
                    }
         
                    if (IrbSupervisorApproval::where('irb_sub_form_id', $form->id)->where('supervisor_id', $faculty->faculty_code)->exists()) {
                        IrbSupervisorApproval::where('irb_sub_form_id', $form->id)->where('supervisor_id', $faculty->faculty_code)->update([
                            'status' => 'approved'
                        ]);
                    } else {
                        IrbSupervisorApproval::create([
                            'form_type' => 'irb',
                            'irb_sub_form_id' => $form->id,
                            'supervisor_id' => $faculty->faculty_code,
                            'status' => 'approved',
                        ]);
                    }
                    $faculty->supervised_outside = $request->input('outside');
                    $faculty->supervised_campus = $request->input('campus');  
                    $faculty->save();
                    return response()->json(['message' => 'Form updated successfully'], 200);
                } else {
                    return response()->json(['message' => 'You are not authorized to access this resource'], 403);
                }
            }
            else{
                return response()->json(['message' => 'You are not authorized to access this resource'], 403);
            }
        }

        private function updateDordcForm($user,$request)
        {
            $request->validate([
                'student_id' => 'required|integer',
            ]);
            $student=Student::find($request->input('student_id'));
            $form = $student->irbSubForms;
            if (!$form) {
                return response()->json(['message' => 'Form not found'], 404);
            }
            if($form->stage=='dordc'){
                $form->form_type='revised';
                $form->stage='student';
                $form->status='awaited';
                $form->dordc_approval='awaited';
                $form->dra_approval='awaited';
                $form->hod_approval='awaited';
                $form->student_lock=false;
                $form->dordc_lock=true;

                $form->save();
                //mail all that dordc asked for revision
            }
            else{
                return response()->json(['message'=>'You are not authorized to access this resource'], 403);
            }

        }
}
