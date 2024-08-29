<?php

namespace App\Http\Controllers;

use App\Models\IrbForm;
use App\Models\IrbSubForm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class IrbFormController extends Controller
{
    public function load(Request $request)
    {
        try{
            $user = Auth::user();
            $role = $user->role->role;
            $request->validate(['form_id' => 'required|integer']);
            $formId = $request->input('form_id');
            switch ($role) {
                case 'student':
                    return $this->handleStudentForm($user);
                case 'hod':
                    return $this->handleHodForm($user, $formId);
                case 'phd_coordinator':
                    return $this->handleCoordinatorForm($user,$formId);
                case 'faculty':
                    return $this->handleFacultyForm($user, $formId);
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
        $studentId = $user->roll_no;
        $form = IrbSubForm::where('student_id', $studentId)->first();

        if (!$form) {
            $newForm = new IrbForm();
            $newForm->student_id = $studentId;
            $newForm->form_type = 'draft';
            $newForm->save();
            return response()->json($newForm->fullForm($user), 200);
        } else {
            return response()->json($form->fullForm($user), 200);
        }
    }
    protected function handleHo

    


}
