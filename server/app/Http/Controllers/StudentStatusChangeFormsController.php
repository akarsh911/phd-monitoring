<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Student;

class StudentStatusChangeFormsController extends Controller
{
    //
    public function load_form(Request $request)
    {
        $user = Auth::user();
        $role = $user->role;
        switch ($role->role) {
            case 'student':
                return $this->handleStudentForm($user);
                break;
            case 'hod':
                return $this->handleHodForm($request, $user);
                break;
            case 'dordc':
                return $this->handleDordcForm($request, $user);
                break;
            case 'dra':
                return $this->handleDraForm($request, $user);
                break;
            case 'director':
                return $this->handleDirectorForm($request, $user);
                break;
            case 'faculty':
                return $this->handleFacultyForm($request, $user);
                break;
            default:
                return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }
    }
    private function handleStudentForm($user)
    {
        $student = $user->student;
        $form = $student->statusChangeForm;
        if ($form) {
            return response()->json($form->fullForm($user), 200);
        }
        $form = $student->statusChangeForm()->create();
        return response()->json($form->fullForm(), 200);
    }

    private function handleFacultyForm($request,$user)
    {
        $user = Auth::user();
        $request->validate([
            'student_id' => 'required|integer'
        ]);
        $student = Student::where('roll_no', $request->input('student_id'))->first();
        if (!$student || !$student->exists()) {
            return response()->json(['message' => 'Student not found'], 404);
        }
        if (!$student->checkSupervises($user->faculty->faculty_code)) {
            return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }
        $form = $student->statusChangeForm;
        if ($form) {
            return response()->json($form->fullForm($user), 200);
        }
        $form = $student->statusChangeForm()->create();
        return response()->json($form->fullForm($user), 200);
    }
    
    private function handleHodForm($request, $user)
    {
        $request->validate([
            'student_id' => 'required|integer'
        ]);
        $student = Student::where('roll_no', $request->input('student_id'))->first();
        if (!$student || !$student->exists()) {
            return response()->json(['message' => 'Student not found'], 404);
        }
        if ($student->department->hod->faculty_code != $user->faculty->faculty_code) {
            return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }
        $form = $student->statusChangeForm;
        if ($form) {
            return response()->json($form->fullForm($user), 200);
        }
        $form = $student->statusChangeForm()->create();
        return response()->json($form->fullForm($user), 200);
    }

    private function handleDraForm($request, $user)
    {
        $request->validate([
            'student_id' => 'required|integer'
        ]);
        $student = Student::where('roll_no', $request->input('student_id'))->first();
        if (!$student || !$student->exists()) {
            return response()->json(['message' => 'Student not found'], 404);
        }
        $form = $student->statusChangeForm;
        if ($form) {
            return response()->json($form->fullForm($user), 200);
        }
        $form = $student->statusChangeForm()->create();
        return response()->json($form->fullForm($user), 200);
    }

    private function handleDordcForm($request, $user)
    {
        $request->validate([
            'student_id' => 'required|integer'
        ]);
        $student = Student::where('roll_no', $request->input('student_id'))->first();
        if (!$student || !$student->exists()) {
            return response()->json(['message' => 'Student not found'], 404);
        }
        $form = $student->statusChangeForm;
        if ($form) {
            return response()->json($form->fullForm($user), 200);
        }
        $form = $student->statusChangeForm()->create();
        return response()->json($form->fullForm($user), 200);
    }

    private function handleDirectorForm($request, $user)
    {
        $request->validate([
            'student_id' => 'required|integer'
        ]);
        $student = Student::where('roll_no', $request->input('student_id'))->first();
        if (!$student || !$student->exists()) {
            return response()->json(['message' => 'Student not found'], 404);
        }
        $form = $student->statusChangeForm;
        if ($form) {
            return response()->json($form->fullForm($user), 200);
        }
        $form = $student->statusChangeForm()->create();
        return response()->json($form->fullForm($user), 200);
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
            case 'director':
                return $this->submitDirectorForm($request, $user);
                break;
            case 'faculty':
                return $this->submitSupervisorForm($request, $user);
                break;
            default:
                return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }
    }

    private function submitStudentForm(Request $request, $user)
    {
        $student = $user->student;
        $form = $student->statusChangeForm;
        if (!$form) {
            return response()->json(['message' => 'Form not found'], 404);
        }
        $form->studet_lock = true;
        $form->supervisor_lock = false;
        $form->stage = "supervisor";
        $form->save();
    }
    private function submitSupervisorForm(Request $request, $user)
    {
        $request->validate([
            'student_id' => 'required|integer',
            'supervisor_approval' => 'required|in:approved,rejected',
            'SupervisorComments' => 'required|string'
        ]);
        $student = Student::where('roll_no', $request->input('student_id'))->first();
        if (!$student || !$student->exists()) {
            return response()->json(['message' => 'Student not found'], 404);
        }
        if (!$student->checkSupervises($user->faculty->faculty_code)) {
            return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }
        $form = $student->statusChangeForm;
        if (!$form) {
            return response()->json(['message' => 'Form not found'], 404);
        }
        if ($form->supervisor_lock) {
            return response()->json(['message' => 'Form already submitted'], 400);
        }
        $form->supervisor_approval = $request->supervisor_approval;
        $form->SupervisorComments = $request->SupervisorComments;
        if($request->supervisor_approval == 'rejected'){
            $form->student_lock = false;
            $form->supervisor_lock = true;
            $form->stage = "student";
            $form->save();
            return response()->json(['message' => 'Form rejected successfully'], 200);
        }
        $form->supervisor_lock = true;
        $form->hod_lock = false;
        $form->stage = "hod";
        $form->save();
        return response()->json(['message' => 'Form submitted successfully'], 200);
    }

    private function submitHodForm(Request $request, $user)
    {
        $request->validate([
            'student_id' => 'required|integer',
            'hod_approval' => 'required|in:approved,rejected',
            'HODComments' => 'required|string'
        ]);
        $student = Student::where('roll_no', $request->input('student_id'))->first();
        if (!$student || !$student->exists()) {
            return response()->json(['message' => 'Student not found'], 404);
        }
        if ($student->department->hod->faculty_code != $user->faculty->faculty_code) {
            return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }
        $form = $student->statusChangeForm;
        if (!$form) {
            return response()->json(['message' => 'Form not found'], 404);
        }
        if ($form->hod_lock) {
            return response()->json(['message' => 'Form already submitted'], 400);
        }
        $form->hod_approval = $request->hod_approval;
        $form->HODComments = $request->HODComments;
        if($request->hod_approval == 'rejected'){
            $form->student_lock = false;
            $form->supervisor_lock = true;
            $form->hod_lock = true;
            $form->stage = "student";
            $form->save();
            return response()->json(['message' => 'Form rejected successfully'], 200);
        }
        $form->hod_lock = true;
        $form->dra_lock = false;
        $form->stage = "dra";
        $form->save();
        return response()->json(['message' => 'Form submitted successfully'], 200);
    }

    private function submitDraForm($request,$user)
    {
        $request->validate([
            'student_id' => 'required|integer',
            'dra_approval' => 'required|in:approved,rejected',
            'DRAComments' => 'required|string'
        ]);
        $student = Student::where('roll_no', $request->input('student_id'))->first();   
        if (!$student || !$student->exists()) {
            return response()->json(['message' => 'Student not found'], 404);
        }
        $form=$student->statusChangeForm;
        if(!$form){
            return response()->json(['message' => 'Form not found'], 404);
        }
        if($form->dra_lock){
            return response()->json(['message' => 'Form already submitted'], 400);
        }
        $form->dra_approval = $request->dra_approval;
        $form->DRAComments = $request->DRAComments;
        if($request->dra_approval == 'rejected'){
            $form->student_lock = false;
            $form->supervisor_lock = true;
            $form->hod_lock = true;
            $form->dra_lock = true;
            $form->stage = "student";
            $form->save();
            return response()->json(['message' => 'Form rejected successfully'], 200);
        }
        $form->dra_lock = true;
        $form->dordc_lock = false;
        $form->stage = "dordc";
        $form->save();
        return response()->json(['message' => 'Form submitted successfully'], 200);
    }

    private function submitDordcForm($request,$user)
    {
        $request->validate([
            'student_id' => 'required|integer',
            'dordc_approval' => 'required|in:approved,rejected',
            'DORDCComments' => 'required|string'
        ]);
        $student = Student::where('roll_no', $request->input('student_id'))->first();
        if (!$student || !$student->exists()) {
            return response()->json(['message' => 'Student not found'], 404);
        }
        $form=$student->statusChangeForm;
        if(!$form){
            return response()->json(['message' => 'Form not found'], 404);
        }
        if($form->dordc_lock){
            return response()->json(['message' => 'Form already submitted'], 400);
        }
        $form->dordc_approval = $request->dordc_approval;
        $form->DORDCComments = $request->DORDCComments;
        if($request->dordc_approval == 'rejected'){
            $form->student_lock = false;
            $form->supervisor_lock = true;
            $form->hod_lock = true;
            $form->dra_lock = true;
            $form->dordc_lock = true;
            $form->stage = "student";
            $form->save();
            return response()->json(['message' => 'Form rejected successfully'], 200);
        }
        else{
            $changes=$form->student->statusChanges;

            if($changes->count()>0){
                $form->director_lock = false;
                $form->dordc_lock = true;
                $form->stage = "director";
                $form->save();
            }
            else{
                $form->dordc_lock = true;
                $form->stage="completed";
                $form->save();
            }
        }
    }

    private function submitDirectorForm($request,$user)
    {
        $request->validate([
            'student_id' => 'required|integer',
            'director_approval' => 'required|in:approved,rejected',
            'DirectorComments' => 'required|string'
        ]);
        $student = Student::where('roll_no', $request->input('student_id'))->first();
        if (!$student || !$student->exists()) {
            return response()->json(['message' => 'Student not found'], 404);
        }
        $form=$student->statusChangeForm;
        if(!$form){
            return response()->json(['message' => 'Form not found'], 404);
        }
        if($form->director_lock){
            return response()->json(['message' => 'Form already submitted'], 400);
        }
        $form->director_approval = $request->director_approval;
        $form->DirectorComments = $request->DirectorComments;
        if($request->director_approval == 'rejected'){
            $form->student_lock = false;
            $form->supervisor_lock = true;
            $form->hod_lock = true;
            $form->dra_lock = true;
            $form->dordc_lock = true;
            $form->director_lock = true;
            $form->stage = "student";
            $form->save();
            return response()->json(['message' => 'Form rejected '], 200);
        }
        else{
            $changes=$form->student->statusChanges;
            if($changes->count()>0){
                $form->director_lock = true;
                $form->stage = "completed";
                $form->save();
            }
            else{
                return response()->json(['message' => 'Form does not require Director Approval'], 400);
            }
        }
    }
}
