<?php

namespace App\Http\Controllers;


use App\Models\ResearchExtentionsApprovals;
use App\Models\ResearchExtentionsForm;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ResearchExtentionsController extends Controller
{
    public function loadForm(Request $request)
    {
        $user = Auth::user();
        $role = $user->role;
        // Log the role in console

        switch ($role->role) {
            case 'student':
                return $this->handleStudentForm($user);
                break;
            case 'hod':
                return $this->handleHodForm($user, $request);
                break;
            case 'dra':
            case 'dordc':
                return $this->handleAdminForm($request, $user);
                break;
            case 'faculty':
                return $this->handleFacultyForm($user, $request);
                break;
            default:
                return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }
    }

    private function handleStudentForm($user)
    {
        try {
            $student = Student::findByUserId($user->id);
            if(!$student){
                return response()->json(['message'=>'Student not found'],404);
            }
            $researchExtentionsForm = $student->researchExtentionsForm;
            if ($researchExtentionsForm) {
                return response()->json(['form' => $researchExtentionsForm->fullForm($user)], 200);
            } else {
                $newForm = ResearchExtentionsForm::create([
                    'student_id' => $student->roll_no,
                    'status' => 'awaited',
                    'stage' => 'student',
                    'SuperVisorComments' => null,
                    'HODComments' => null,
                    'DORDCComments' => null,
                    'DRAComments' => null,
                ]);
                return response()->json(['form' => $newForm->fullForm($user)], 200);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }


    private function handleFacultyForm($user, $request)
    {
        try {
            $student = Student::where('roll_no',$request->input('student_id'))->first();
            if (!$student||!$student->exists()) {
                return response()->json(['message' => 'Student not found'], 404);
            }
            $researchExtentionsForm = $student->researchExtentionsForm;
            if($researchExtentionsForm){
                if ($student->checkSupervises($user->faculty->faculty_code)) {
                    return response()->json($researchExtentionsForm->fullForm($user));
                } else {
                    return response()->json(['message' => 'You are not authorized to access this resource'], 403);
                }
            }else{
                return response()->json(['message'=>'Form not found'],404);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    private function handleHodForm($user, $request)
    {
        try {
            $student = Student::where('roll_no',$request->input('student_id'))->first();
            if (!$student||!$student->exists()) {
                return response()->json(['message' => 'Student not found'], 404);
            }
            $researchExtentionsForm = $student->researchExtentionsForm;
            if($researchExtentionsForm){
                if ($student->department->id==$user->faculty->department_id)  {
                    return response()->json($student->researchExtentionsForm->fullForm($user));
                } else {
                    return response()->json(['message' => 'You are not authorized to access this resource'], 403);
                }
            }else{
                return response()->json(['message'=>'Form not found'],404);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    private function handleAdminForm($request, $user)
    {

        $request->validate(['student_id' => 'required|integer']);


        try {
            $student = Student::where('roll_no', $request->input('student_id'))->first();
            if (!$student->exists()) {
                return response()->json(['message' => 'Student not found'], 404);
            }
            $researchExtentionsForm = $student->researchExtentionsForm;

            if ($researchExtentionsForm) {
                return response()->json($researchExtentionsForm->fullForm($user));
            } else {
                return response()->json(['message' => 'No form found'], 404);
            }
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }
    }








    //sumbit form

    public function submit(Request $request)
    {
        $user = Auth::user();
        $role = $user->role;

        switch ($role->role) {
            case 'student':
                return $this->sendSuperVisor($request);
                break;
            case 'faculty':
                return $this->sendToHOD($request);
                break;
            case 'hod':
                return $this->sendToDRA($request);
                break;
            default:
                return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }
    }


    private function sendSuperVisor(Request $request)
    {
        $request->validate([
            'start' => 'required|string',
            'end' => 'required|string',
            'reason' => 'required|string',
        ]);

        try {
            $user = Auth::user();
            if ($user->role->role == 'student') {
                $student = Student::findByUserId($user->id);
                $researchExtentionsForm = $student->researchExtentionsForm;
                if ($researchExtentionsForm->stage != 'student') {
                    return response()->json(['message' => 'Form already submitted'], 403);
                }
                if ($researchExtentionsForm) {
                    $researchExtentionsForm->update([
                        'stage' => 'supervisor',
                        'status' => 'awaited',
                        'start_date' => $request->input('start'),
                        'end_date' => $request->input('end'),
                        'reason' => $request->input('reason'),
                        'supervisor_lock' => false,
                        'student_lock' => true,
                    ]);
             
                    return response()->json($student->researchExtentionsForm->fullForm($user));
                } else {
                    return response()->json(['message' => 'No form found'], 404);
                }
            } else {
                return response()->json(['message' => 'You are not authorized to access this resource'], 403);
            }
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }
    }

    private function sendTOHOD(Request $request)
    {
        $request->validate([
            'student_id' => 'required|integer',
        ]);
        try{
            $user = Auth::user();
            if ($user->role->role == 'faculty') {
                $student= Student::where('roll_no',$request->student_id)->first();
                if (!$student||!$student->exists()) {
                    return response()->json(['message' => 'Student not found'], 404);
                }
                $extentionForm = $student->researchExtentionsForm;
                if ($extentionForm->stage != 'supervisor') {
                    return response()->json(['message' => 'Form is unavailable to submit'], 403);
                }
                if ($student->checkSupervises($user->faculty->faculty_code)) {
                    if (sizeof($extentionForm->researchExtentionsApprovals) != sizeof($student->supervisors)) {
                        return response()->json(['message' => 'Approval pending from other supervisors'], 403);
                    }
                    foreach ($extentionForm->researchExtentionsApprovals as $approval) {
                        if ($approval->status == 'awaited' || $approval->status == 'rejected') {
                            return response()->json(['message' => 'Approval pending from other supervisors'], 403);
                        }
                    }
                    $extentionForm->update([
                        'stage' => 'hod',
                        'status' => 'awaited',
                        'supervisor_lock' => true,
                        'hod_lock' => false
                    ]);
                    return response()->json($student->researchExtentionsForm->fullForm($user));
                }
                else{
                    return response()->json(['message' => 'You are not authorized to access this resource'], 403);
                }
            }
            else{
                return response()->json(['message' => 'You are not authorized to access this resource'], 403);
            }
        }
        catch(\Illuminate\Validation\ValidationException $e){
            return response()->json(['errors'=>$e->errors()],422);
        }
    }


    private function sendToDRA(Request $request)
    {
        $request->validate([
            'student_id' => 'required|integer',
            'approval' => 'required|string|in:approved,rejected'
        ]);
        try{
            $user = Auth::user();
            if ($user->role->role == 'hod') {
                $student= Student::where('roll_no',$request->student_id)->first();
                if (!$student||!$student->exists()) {
                    return response()->json(['message' => 'Student not found'], 404);
                }
                $extentionForm = $student->researchExtentionsForm;
                if ($extentionForm->stage != 'hod') {
                    return response()->json(['message' => 'Form is unavailable to submit'], 403);
                }
                if ($student->department->id==$user->faculty->department_id) {
                   if($request->approval=='approved'){
                       $extentionForm->update([
                           'stage' => 'dra',
                           'status' => 'awaited',
                           'hod_lock' => true,
                           'dra_lock' => false
                       ]);
                   }
                   else{
                       $extentionForm->update([
                           'status' => 'rejected',
                           'hod_lock' => true,
                           'dra_lock' => true
                       ]);
                   }
                   return response()->json($student->researchExtentionsForm->fullForm($user));
                }
                else{
                    return response()->json(['message' => 'You are not authorized to access this resource'], 403);
                }
            }
            else{
                return response()->json(['message' => 'You are not authorized to access this resource'], 403);
            }
        }
        catch(\Illuminate\Validation\ValidationException $e){
            return response()->json(['errors'=>$e->errors()],422);
        }
    }



    public function approve(Request $request)
    {
        $request->validate([
            'student_id' => 'required|integer',
            'approval' => 'required|string|in:approved,rejected'
        ]);
        try{
            $user = Auth::user();
            if ($user->role->role == 'faculty') {
                $student= Student::where('roll_no',$request->student_id)->first();
                if (!$student||!$student->exists()) {
                    return response()->json(['message' => 'Student not found'], 404);
                }
                $extentionForm = $student->researchExtentionsForm;
                if ($extentionForm->stage != 'supervisor') {
                    return response()->json(['message' => 'Form is unavailable to submit'], 403);
                }
                if ($student->checkSupervises($user->faculty->faculty_code)) {
                    $approval = $extentionForm->researchExtentionsApprovals->where('supervisor_id',$user->faculty->faculty_code)->first();
                    if($approval){
                        if($approval->status=='awaited'||$approval->status=='rejected'){

                            $approval->update([
                                'status'=>$request->approval
                            ]);
                            return response()->json('Approval updated',200);
                        }
                        else{
                            return response()->json(['message'=>'Already approved'],403);
                        }
                    }
                    else{
                        $newform=ResearchExtentionsApprovals::create([
                            'research_extentions_id'=>$extentionForm->id,
                            'supervisor_id'=>$user->faculty->faculty_code,
                            'status'=>$request->approval
                        ]);
                        return response()->json('Approval added',200);

                    }
                }
                else{
                    return response()->json(['message'=>'You are not authorized to access this resource'],403);
                }
            }
            else{
                return response()->json(['message'=>'You are not authorized to access this resource'],403);
            }
        }
        catch(\Illuminate\Validation\ValidationException $e){
            return response()->json(['errors'=>$e->errors()],422);
        }
    }
}
