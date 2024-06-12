<?php

namespace App\Http\Controllers;

use App\Models\IrbForm;
use App\Models\IrbSubForm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class IrbFormController extends Controller
{
    public function index()
    {
        // Retrieve all IRB forms
        $irbForms = IrbForm::all();

        // Return response
        return response()->json($irbForms);
    }

    /**
     * Store a newly created IRB form in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        try{
            $user = Auth::user();
            $role = $user->role;
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
        try{
        $studentId = $user->roll_no;
        $irbSubForm=IrbSubForm::where('student_id',$studentId)->first();
        if ($irbSubForm) {
            return response()->json($irbSubForm);
        } else {
            $irbSubForm = new IrbSubForm(
                [
                    'student_id' => $studentId,
                    'status' => 'awaited',
                    'stage' => 'student',
                    'student_comments' => '',
                    'supervisor_comments' => '',
                    'phd_coordinator_comments' => '',
                    'hod_comments' => '',
                ]
            );
            return response()->json($irbSubForm);
        }}
        catch(\Exception $e){
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }

    protected function handleHodForm($user, $formId)
    {
        try{
        $irbSubForm = IrbSubForm::findOrFail($formId);
        $student=$irbSubForm->student;
        if($student->checkHOD($user->id))
        {
            if ($irbSubForm->stage === 'hod') {
                return response()->json($irbSubForm);
            } else {
                return response()->json(['message' => 'This resource is locked'], 403);
            }
        }
        else{
            return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }}
        catch(\Exception $e){
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }

    private function handleCoordinatorForm($user,$formId)
    {
        try{
        $irbSubForm = IrbSubForm::findOrFail($formId);
        $student=$irbSubForm->student;
        if($student->checkPhdCoordinator($user->id))
        {
            if ($irbSubForm->stage === 'phd_coordinator') {
                return response()->json($irbSubForm);
            } else {
                return response()->json(['message' => 'This resource is locked'], 403);
            }
        }
        else{
            return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }}
        catch(\Exception $e){
            return response()->json(['message' => $e->getMessage()], 400);
        
        }
        
    }

    // public function sendToSupervi
    public function destroy($id)
    {
        // Find the IRB form by ID and delete it
        $irbForm = IrbForm::findOrFail($id);
        $irbForm->delete();

        // Return response
        return response()->json(null, 204);
    }
}
