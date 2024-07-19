<?php

namespace App\Http\Controllers;

use App\Models\BroadAreaSpecialization;
use App\Models\Faculty;
use App\Models\Student;
use App\Models\StudentBroadAreaSpecialization;
use App\Models\SupervisorChangeForm ;
use App\Models\SupervisorChangeFormPreference;
use App\Models\SupervisorChangeFormUpdatedSupervisor;
use Illuminate\Http\Request;    
use Illuminate\Support\Facades\Auth;


class SupervisorChangeFormController extends Controller {

    public function loadForm(Request $request)
    {

        $user = Auth::user();
        $role = $user->role;
        switch ($role->role) {
            case 'student':
                return $this->handleStudentForm($user);
                break;
            case 'hod':
                return $this->handleHodForm($user, $request);
                break;
            case 'dordc':
                return $this->handleDordcForm($request, $user);
                break;
            case 'dra':
                return $this->handleDraForm($request, $user);
                break;
            default:
                return response()->json(['message' => 'You are not authorized to access this resource'], 403);
            }        
    }

    private function handleStudentForm($user)
    {
        try{
        $student = $user->student;
        if (!$student||!$student->exists()) {
            return response()->json(['message' => 'Student not found'], 404);
        }
        $form = $student->supervisorChangeForm;
        if(!$form){
            $form =  SupervisorChangeForm::create([
                'student_id' => $student->roll_no,
                'reason' => '',
                'status' => 'awaited',
                'stage' => 'student',
                'HODComments' => '',
                'DORDCComments' => '',
                'DRAComments' => ''
            ]);       
            
        }
        return response()->json($form->fullform($user));
    }
         catch(\Exception $e){
             echo $e;
             return response()->json(['message' => 'Error Occured'], 404);
         }
    }
    private function handleHodForm($user, $request)
    {
        try{
        $student = Student::where('roll_no',$request->input('student_id'))->first();
        if (!$student||!$student->exists()) {
            return response()->json(['message' => 'Student not found'], 404);
        }
        $form = $student->supervisorChangeForm;
        if(!$form){
            return response()->json(['message' => 'Form not found'], 404);
        }
        if($form->stage != 'hod'){
            return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }
        return response()->json($form->fullform($user));
    }
         catch(\Exception $e){
            echo $e;
             return response()->json(['message' => 'Error'], 500);
         }
    }     
    private function handleDordcForm($request, $user)
    {
        try{
            $student = Student::where('roll_no',$request->input('student_id'))->first();
            if (!$student||!$student->exists()) {
                return response()->json(['message' => 'Student not found'], 404);
            }
           $form = $student->supervisorChangeForm;
           if(!$form){
               return response()->json(['message' => 'Form not found'], 404);
           }
           if($form->stage != 'dordc'){
               return response()->json(['message' => 'You are not authorized to access this resource'], 403);
           }
           return response()->json($form->fullform($user));
        }
         catch(\Exception $e){
             return response()->json(['message' => 'Student not found'], 404);
         }
    }

    private function handleDraForm($request, $user)
    {
        try{
            $student = Student::where('roll_no',$request->input('student_id'))->first();
            if (!$student||!$student->exists()) {
                return response()->json(['message' => 'Student not found'], 404);
            }
              $form = $student->supervisorChangeForm;
              if(!$form){
                  return response()->json(['message' => 'Form not found'], 404);
              }
              if($form->stage != 'dra'){
                  return response()->json(['message' => 'You are not authorized to access this resource'], 403);
              }
              return response()->json($form->fullform($user));
          }
            catch(\Exception $e){
                return response()->json(['message' => 'Student not found'], 404);
            }
    }


    public function submitForm(Request $request)
    {
        $user = Auth::user();
        $role = $user->role;
        switch ($role->role) {
            case 'student':
                return $this->submitStudentForm($request, $user);
                break;
            case 'hod':
                return $this->submitHodForm($request, $user);
                break;
            case 'dordc':
                return $this->submitDordcForm($request, $user);
                break;
            case 'dra':
                return $this->submitDraForm($request, $user);
                break;
            default:
                return response()->json(['message' => 'You are not authorized to access this resource'], 403);
            }
    }

    private function submitStudentForm(Request $request, $user)
    {
        try{
            $request->validate([
                'reason' => 'required|string',
                'prefrences' => 'required|array',
                'changes' => 'required|array',
                'areas_of_research' => 'required|array',
            ]);
            $student = $user->student;
            if (!$student||!$student->exists()) {
                return response()->json(['message' => 'Student not found'], 404);
            }
            $form = $student->supervisorChangeForm;
            if(!$form){
                return response()->json(['message' => 'Form not found'], 404);
            }
            if($form->stage != 'student'){
                return response()->json(['message' => 'Form is unavailable to submit!'], 403);
            }

            if($form->student_lock){
                return response()->json(['message' => 'Form is locked!'], 403);
            }

            if(sizeof($request->input('prefrences'))!= 3){
                return response()->json(['message' => 'Preferences should be 3!'], 403);
            }
            
            $prefrences = $request->input('prefrences');

            foreach($prefrences as $preference){
                if(!Faculty::where('faculty_code',$preference)->exists()){
                    return response()->json(['message' => 'Invalid faculty code!'], 403);
                }
            }
            
            foreach($prefrences as $preference)
            {
                SupervisorChangeFormPreference::create([
                    'form_id' => $form->id,
                    'supervisor_id' => $preference,
                ]);
            }

            $changes= $request->input('changes');

            foreach($changes as $change){
                if (!in_array($change, $student->supervisors->pluck('faculty_code')->toArray())) {
                    return response()->json(['message' => 'Invalid supervisor code!'], 403);
                }
            }

            foreach ($changes as $change) {
                $oldSupervisor = $student->supervisors->where('faculty_code', $change)->first();
                if($oldSupervisor){
                    SupervisorChangeFormUpdatedSupervisor::create([
                        'form_id' => $form->id,
                        'old_supervisor_id' => $oldSupervisor->faculty_code,
                    ]);
                }
            }

            $areas_of_research = $request->input('areas_of_research');
            foreach($areas_of_research as $area){
                if (!BroadAreaSpecialization::where('id',$area)->exists()) {
                    return response()->json(['message' => 'Invalid area of research!'], 403);
                }
            }

            foreach($areas_of_research as $area){
                StudentBroadAreaSpecialization::create([
                    'student_id' => $student->roll_no,
                    'specialization_id' => $area
                ]);
            }
            $form->reason = $request->input('reason');
            $form->student_lock = true;
            $form->stage = 'hod';
            $form->hod_lock = false;
            $form->save();

            return response()->json(['message' => 'Form submitted successfully!'],200);
        }
        catch(\Exception $e){
            echo $e;
            return response()->json(['message' => 'Error'], 500);
        }
    }

    private function submitHodForm(Request $request, $user)
    {
        try{
            $request->validate([
                'student_id' => 'required|integer',
                'hod_approval' => 'required|string',
                'comment' => 'required|string',
                'changes' => 'required|array',
            ]);
            $student = Student::where('roll_no',$request->input('student_id'))->first();
            if (!$student||!$student->exists()) {
                return response()->json(['message' => 'Student not found'], 404);
            }
            $form = $student->supervisorChangeForm;
            if(!$form){
                return response()->json(['message' => 'Form not found'], 404);
            }
            if($form->stage != 'hod'){
                return response()->json(['message' => 'Form is unavailable to submit!'], 403);
            }
            if($form->hod_lock){
                return response()->json(['message' => 'Form is locked!'], 403);
            }
            if($request->input('hod_approval') != 'approved' && $request->input('hod_approval') != 'rejected'){
                return response()->json(['message' => 'Invalid hod approval!'], 403);
            }

            $changes= $request->input('changes');

            foreach($changes as $change){
                if (!Faculty::where('faculty_code',$change["old_supervisor_id"])->exists()) {
                    return response()->json(['message' => 'Invalid supervisor code!'], 403);
                }
                if (!Faculty::where('faculty_code',$change["new_supervisor_id"])->exists()) {
                    return response()->json(['message' => 'Invalid supervisor code!'], 403);
                }
            }

            foreach($changes as $change){
                $supervisorUpdate= SupervisorChangeFormUpdatedSupervisor::where('form_id',$form->id)->where('old_supervisor_id',$change["old_supervisor_id"])->first();
                if($supervisorUpdate){
                    $supervisorUpdate->new_supervisor_id = $change["new_supervisor_id"];
                    $supervisorUpdate->save();
                }
            }   


            $form->hod_approval = $request->input('hod_approval');
            $form->HODComments = $request->input('comment');
            $form->hod_lock = true;
            $form->dordc_lock = false;
            $form->stage = 'dordc';
            $form->save();
            return response()->json(['message' => 'Form submitted successfully!'],200);
        }
        catch(\Exception $e){
            echo $e;
            return response()->json(['message' => 'Error'], 500);
        }
    }

    private function submitDordcForm(Request $request, $user)
    {
        try{
            $request->validate([
                'student_id' => 'required|integer',
                'dordc_approval' => 'required|string',
                'comment' => 'required|string',
            ]);
            $student = Student::where('roll_no',$request->input('student_id'))->first();
            if (!$student||!$student->exists()) {
                return response()->json(['message' => 'Student not found'], 404);
            }
            $form = $student->supervisorChangeForm;
            if(!$form){
                return response()->json(['message' => 'Form not found'], 404);
            }
            if($form->stage != 'dordc'){
                return response()->json(['message' => 'Form is unavailable to submit!'], 403);
            }
            if($form->dordc_lock){
                return response()->json(['message' => 'Form is locked!'], 403);
            }
            if($request->input('dordc_approval') != 'approved' && $request->input('dordc_approval') != 'rejected'){
                return response()->json(['message' => 'Invalid dordc approval!'], 403);
            }
            $form->dordc_approval = $request->input('dordc_approval');
            $form->DORDCComments = $request->input('comment');
            $form->dordc_lock = true;
            $form->dra_lock = false;
            $form->stage = 'dra';
            $form->save();
            return response()->json(['message' => 'Form submitted successfully!'],200);
        }
        catch(\Exception $e){
            echo $e;
            return response()->json(['message' => 'Error'], 500);
        }
    }

    private function submitDraForm(Request $request, $user)
    {
        try{
            $request->validate([
                'student_id' => 'required|integer',
                'dra_approval' => 'required|string',
                'comment' => 'required|string',
            ]);
            $student = Student::where('roll_no',$request->input('student_id'))->first();
            if (!$student||!$student->exists()) {
                return response()->json(['message' => 'Student not found'], 404);
            }
            $form = $student->supervisorChangeForm;
            if(!$form){
                return response()->json(['message' => 'Form not found'], 404);
            }
            if($form->stage != 'dra'){
                return response()->json(['message' => 'Form is unavailable to submit!'], 403);
            }
            if($form->dra_lock){
                return response()->json(['message' => 'Form is locked!'], 403);
            }
            if($request->input('dra_approval') != 'approved' && $request->input('dra_approval') != 'rejected'){
                return response()->json(['message' => 'Invalid dra approval!'], 403);
            }
            $form->dra_approval = $request->input('dra_approval');
            $form->DRAComments = $request->input('comment');
            $form->dra_lock = true;
            $form->status="approved";
            $form->save();
            return response()->json(['message' => 'Form submitted successfully!'],200);
        }
        catch(\Exception $e){
            echo $e;
            return response()->json(['message' => 'Error'], 500);
        }
    }
}
