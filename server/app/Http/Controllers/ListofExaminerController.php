<?php

namespace App\Http\Controllers;

use App\Models\Faculty;
use App\Models\IrbForm;
use App\Models\IrbFormHistory;
use App\Models\IrbNomineeCognate;
use App\Models\IrbOutsideExpert;
use App\Models\IrbSupervisorApproval;
use App\Models\ListOfExaminersForm;
use App\Models\OutsideExpert;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ListOfExaminersFormController extends Controller
{
    public function load(Request $request)
    {
        $user = Auth::user();
        $role=$user->role->role;
        switch($role){
            case 'faculty':
                return $this->handleFaculty($user, $request);
                break;
            case 'dordc':
                return $this->handleDordc($user, $request);
                break;
            case 'director':
                return $this->handleDirector($user, $request);
                break;
            default:
                return response()->json(['message'=>'Unauthorized']);
        }
    }

    private function handleFaculty($user, $request)
    {
        $request->validate([
            'student_id' => 'required|string',
        ]);
        $student = Student::find($request->student_id);
        if (!$student) {
            return response()->json(['message' => 'Student not found']);
        }
        $form = ListOfExaminersForm::where('student_id', $student->roll_no)
        ->where('supervisor_id', $user->faculty->faculty_code)
        ->first();
        if (!$form) {
            $newForm = new ListOfExaminersForm();
            $newForm->student_id = $student->roll_no;
            $newForm->supervisor_id = $user->faculty->faculty_code;
            $newForm->save();
            return response()->json([$newForm->fullForm($user)]);
        }
        else    
        return response()->json([$form->fullForm($user)]);
    }

    private function handleDordc($user, $request)
    {
       $request->validate([
            'form_id' => 'required|integer',
        ]);
     
        $form = ListOfExaminersForm::where('id', $request->form_id);
        $student=$form->student;
        if (!$form) {
            return response()->json(['message' => 'Form not found']);
        }
        else    
        return response()->json([$form->fullForm($user)]);
    }

    private function handleDirector($user, $request)
    {
        $request->validate([
            'form_id' => 'required|integer',
        ]);
        $form = ListOfExaminersForm::where('id', $request->form_id);
        if(!$form){
            return response()->json(['message'=>'Form not found']);
        }
        else
        {
            return response()->json([$form->fullForm($user)]);
        }
    }

    public function submit(Request $request)
    {
        $user = Auth::user();
        $role=$user->role->role;
        switch($role){
            case 'faculty':
                return $this->submitFaculty($user, $request);
                break;
            case 'dordc':
                return $this->submitDordc($user, $request);
                break;
            case 'director':
                return $this->submitDirector($user, $request);
                break;
            default:
                return response()->json(['message'=>'Unauthorized']);
        }
    }

    private function submitFaculty($user, $request)
    {
        $request->validate([
            'form_id' => 'required|integer',
            'status' => 'required|string',
            'comments' => 'nullable|string',
        ]);
        $form = ListOfExaminersForm::find($request->form_id);
        if (!$form) {
            return response()->json(['message' => 'Form not found']);
        }
        if ($form->supervisor_id != $user->faculty->faculty_code) {
            return response()->json(['message' => 'Unauthorized']);
        }
        $form->status = $request->status;
        $form->SuperVisorComments = $request->comments;
        $form->supervisor_lock = false;
        $form->save();
        return response()->json([$form->fullForm($user)]);
    }
}
