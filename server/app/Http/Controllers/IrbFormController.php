<?php

namespace App\Http\Controllers;

use App\Models\Faculty;
use App\Models\IrbForm;
use App\Models\IrbFormHistory;
use App\Models\IrbNomineeCognate;
use App\Models\IrbOutsideExpert;
use App\Models\IrbSupervisorApproval;
use App\Models\OutsideExpert;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class IrbFormController extends Controller
{
    public function index()
    {
        $irbForms = IrbForm::with([
            'student',
            'nomineeCognates.supervisor',
            'nomineeCognates.nominee',
            'outsideExperts.expert',
            'expertDepartments.expert',
            'formHistories.user'
        ])->get();
        return response()->json($irbForms);
    }

    public function destroy($id)
    {
        $irbForm = IrbForm::findOrFail($id);
        $irbForm->delete();
        return response()->json(null, 204);
    }

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

    protected function handleStudentForm($user)
    {
        try {
            $student = Student::findByUserId($user->id);
            $formWithHistory = $student->getIrbFormWithHistory();

            if ($formWithHistory) {
                return response()->json($student->irbForm->fullForm($user));
            } else {
                $newForm = Student::createIrbFormForStudent($student);
                // $history = IrbFormHistory::where('irb_form_id', $newForm->id)->get();
                return response()->json($newForm->fullForm($user));
            }
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }
    }

    protected function handleHodForm($user, $request)
    {
        $request->validate(['student_id' => 'required|integer']);

        try {
            $student = Student::where('roll_no', $request->input('student_id'))->first();
            if (!$student) {
                return response()->json(['message' => 'Student not found'], 404);
            }
            $irbForm = $student->irbForm;

            if ($irbForm) {
                $student = $irbForm->student;
                if ($student->department->id==$user->faculty->department_id)  {
                    return response()->json($student->irbForm->fullForm($user));
                } else {
                    return response()->json(['message' => 'You are not authorized to access this resource'], 403);
                }
            } else {
                return response()->json(['message' => 'No form found'], 404);
            }
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }
    }

    protected function handleAdminForm($request, $user)
    {

        $request->validate(['student_id' => 'required|integer']);


        try {
            $student = Student::where('roll_no', $request->input('student_id'))->first();
            if (!$student->exists()) {
                return response()->json(['message' => 'Student not found'], 404);
            }
            $irbForm = $student->irbForm;

            if ($irbForm) {
                return response()->json($irbForm->fullForm($user));
            } else {
                return response()->json(['message' => 'No form found'], 404);
            }
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }
    }

    protected function handleFacultyForm($user, $request)
    {
        $request->validate(['student_id' => 'required|integer']);
     
        try {
            $student = Student::where('roll_no',$request->input('student_id'))->first();
            if (!$student||!$student->exists()) {
                return response()->json(['message' => 'Student not found'], 404);
            }
            $irbForm = $student->irbForm;

            if ($irbForm) {
                $student = $irbForm->student;
                if ($student->checkSupervises($user->faculty->faculty_code)) {
                    return response()->json($irbForm->fullForm($user));
                } else {
                    return response()->json(['message' => 'You are not authorized to access this resource'], 403);
                }
            } else {
                return response()->json(['message' => 'No form found'], 404);
            }
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }
    }


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
                return $this->sendToDoRDC($request);
                break;
            case 'dordc':
                return $this->sendToDRA($request);
                break;
            default:
                return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }
    }

    public function sendSuperVisor(Request $request)
    {

        try {
            $user = Auth::user();
            if ($user->role->role == 'student') {
                $student = Student::findByUserId($user->id);
                $irbForm = $student->irbForm;
                if ($irbForm->stage != 'student') {
                    return response()->json(['message' => 'Form already submitted'], 403);
                }
                if ($irbForm) {
                    $irbForm->update([
                        'stage' => 'supervisor',
                        'status' => 'awaited',
                        'supervisor_lock' => false,
                        'student_lock' => true,
                    ]);
                    IrbFormHistory::create([
                        'irb_form_id' => $irbForm->id,
                        'user_id' => $user->id,
                        'status' => 'awaited',
                        'stage' => 'supervisor',
                        'change' => "Form sent to supervisor by student",
                    ]);
                    //TODO: Send email to supervisor
                    return response()->json($student->irbForm->fullForm($user));
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
    private function compareNomineeIds($array1, $array2)
    {
        if(count($array2)==0){
            return false;
        }
        $nomineeIds1 = array_map(function ($item) {
            return $item['nominee_id'];
        }, json_decode($array1, true));
        $nomineeIds2 = array_map(function ($item) {
            return $item['nominee_id'];
        }, $array2);

        sort($nomineeIds1);
        sort($nomineeIds2);
        return $nomineeIds1 == $nomineeIds2;
    }

    public function superVisorPrefs(Request $request)
    {

        try {
            $user = Auth::user();
            if ($user->role->role == 'faculty') {
                $request->validate([
                    'student_id' => 'required|integer',
                    'comments' => 'required|string',
                    'nomineeCognates' => 'required|array',
                ]);
               
                $student = Student::where('roll_no', $request->student_id)->first();
                if ($student) {

                    $irbForm = $student->irbForm;

                    $faculty = $user->faculty;

                    if ($student->checkSupervises($faculty->faculty_code)) {
                        if ($irbForm->supervisor_lock) {
                            return response()->json(['message' => 'Form is unavailable to edit'], 403);
                        }
                        if ($this->compareNomineeIds($irbForm->nomineeCognates, $request->nomineeCognates)) {
                            if (IrbSupervisorApproval::where('irb_form_id', $irbForm->id)->where('supervisor_id', $faculty->faculty_code)->exists()) {
                                IrbSupervisorApproval::where('irb_form_id', $irbForm->id)->where('supervisor_id', $faculty->faculty_code)->update([
                                    'status' => 'approved'
                                ]);
                            } else {
                                irbsupervisorApproval::create([
                                    'form_type' => 'irb',
                                    'irb_form_id' => $irbForm->id,
                                    'supervisor_id' => $faculty->faculty_code,
                                    'status' => 'approved',
                                ]);
                            }
                        } else {
                            $this->updateSupervisorPrefs($irbForm, $request, $user);
                            if (count($irbForm->supervisorApprovals) > 0) {
                                foreach ($irbForm->superVisorApprovals as $approval) {
                                    $approval->update([
                                        'status' => 'awaited'
                                    ]);
                                }
                            }
                            if (IrbSupervisorApproval::where('irb_form_id', $irbForm->id)->where('supervisor_id', $faculty->faculty_code)->exists()) {
                                IrbSupervisorApproval::where('irb_form_id', $irbForm->id)->where('supervisor_id', $faculty->faculty_code)->update([
                                    'status' => 'approved'
                                ]);
                            } else {
                                irbsupervisorApproval::create([
                                    'form_type' => 'irb',
                                    'irb_form_id' => $irbForm->id,
                                    'supervisor_id' => $faculty->faculty_code,
                                    'status' => 'approved',
                                ]);
                            }
                        }
                        //TODO: inform other supervisors
                        return response()->json($student->irbForm->fullForm($user));
                    } else {
                        return response()->json(['message' => 'You are not authorized to access this resource'], 403);
                    }
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


    protected function updateSupervisorPrefs($irbForm, $request, $user)
    {
        IrbNomineeCognate::where('irb_form_id', $irbForm->id)->delete();

        $irbForm->update([
            'SuperVisorComments' => $request->comments,
            'stage' => 'supervisor',
            'status' => 'approved'
        ]);

        foreach ($request->nomineeCognates as $nomineeCognate) {
            if (Faculty::where('faculty_code', $nomineeCognate['nominee_id'])->exists()) {
                IrbNomineeCognate::create([
                    'irb_form_id' => $irbForm->id,
                    'nominee_id' => $nomineeCognate['nominee_id'],
                    'supervisor_id' => $user->faculty->faculty_code,
                ]);
            }
        }
        IrbFormHistory::create([
            'irb_form_id' => $irbForm->id,
            'user_id' => $user->id,
            'status' => 'approved',
            'stage' => 'supervisor',
            'change' => "SuperVisor added Cognate Nominees",
        ]);
    }
    public function sendToHOD(Request $request)
    {
        try {
            $user = Auth::user();
            if ($user->role->role == 'faculty') {
                $request->validate([
                    'student_id' => 'required|integer',
                    'comments' => 'string',
                ]);

              $student= Student::where('roll_no',$request->student_id)->first();
                if ($student) {
                    $irbForm = $student->irbForm;
                    if ($irbForm->stage != 'supervisor') {
                        return response()->json(['message' => 'Form is unavailable '], 403);
                    }

                    if (sizeof($irbForm->nomineeCognates) < 3) {
                        return response()->json(['message' => 'Nominee Cognates have not been updated'], 403);
                    }

              

                    if ($student->checkSupervises($user->faculty->faculty_code)) {

                        if (sizeof($irbForm->superVisorApprovals) != sizeof($student->supervisors)) {
                            return response()->json(['message' => 'Approval pending from other supervisors'], 403);
                        }
                        foreach ($irbForm->superVisorApprovals as $approval) {
                            if ($approval->status == 'awaited' || $approval->status == 'rejected') {
                                return response()->json(['message' => 'Approval pending from other supervisors'], 403);
                            }
                        }
                        $irbForm->update([
                            'stage' => 'hod',
                            'status' => 'awaited',
                            'SuperVisorComments' => $request->comments,
                            'supervisor_lock' => true,
                            'hod_lock' => false
                        ]);
                        IrbFormHistory::create([
                            'irb_form_id' => $irbForm->id,
                            'user_id' => $user->id,
                            'status' => 'awaited',
                            'stage' => 'hod',
                            'change' => "Form sent to HOD by supervisor",
                        ]);
                        return response()->json(["message" => "Form sent to HOD"]);
                    } else {
                        return response()->json(['message' => 'You are not authorized to access this resource'], 403);
                    }
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

    public function sendToDoRDC(Request $request)
    {
        try {
            $user = Auth::user();
            if ($user->role->role == 'hod') {
                $request->validate([
                    'student_id' => 'required|integer',
                    'outside_experts' => 'required|array',
                    'cognate_experts' => 'required|array',
                    'recommendation' => 'required|string',
                ]);
                $student= Student::where('roll_no',$request->student_id)->first();

                if ($student) {
                    $irbForm = $student->irbForm;
                    // $student = $irbForm->student;
                    if($irbForm->hod_lock){
                        return response()->json(['message' => 'Form is unavailable'], 403);
                    }
                    if ($student->department->id==$user->faculty->department_id) {
                        if ($request->recommendation == 'approved') {
                            foreach ($request->outside_experts as $outsideExpert) {
                                if ($outsideExpert['expert_id'] != null) {
                                    IrbOutsideExpert::create([
                                        'irb_form_id' => $irbForm->id,
                                        'expert_id' => $outsideExpert['expert_id'],
                                        'hod_id' => $user->id,
                                    ]);
                                } else {
                                    OutsideExpert::create([
                                        'first_name' => $outsideExpert['first_name'],
                                        'last_name' => $outsideExpert['last_name'],
                                        'designation' => $outsideExpert['designation'],
                                        'institution' => $outsideExpert['institution'],
                                        'email' => $outsideExpert['email'],
                                        'phone' => $outsideExpert['phone'],
                                    ]);
                                    IrbOutsideExpert::create([
                                        'irb_form_id' => $irbForm->id,
                                        'expert_id' => $outsideExpert['expert_id'],
                                        'hod_id' => $user->id,
                                    ]);
                                }
                                IrbFormHistory::create([
                                    'irb_form_id' => $irbForm->id,
                                    'user_id' => $user->id,
                                    'status' => 'approved',
                                    'stage' => 'hod',
                                    'change' => "HOD added outside expert",
                                ]);
                            }
                            foreach ($request->cognate_experts as $cognateExpert) {
                                if (Faculty::where('faculty_code', $cognateExpert['faculty_code'])->exists()) {
                                    IrbNomineeCognate::create([
                                        'irb_form_id' => $irbForm->id,
                                        'nominee_id' => $cognateExpert['faculty_code'],
                                    ]);
                                    IrbFormHistory::create([
                                        'irb_form_id' => $irbForm->id,
                                        'user_id' => $user->id,
                                        'status' => 'approved',
                                        'stage' => 'hod',
                                        'change' => "HOD added cognate expert",
                                    ]);
                                }
                            }

                            $irbForm->update([
                                'stage' => 'dordc',
                                'status' => 'awaited',
                                'HODComments' => $request->comments,
                                'hod_lock' => true,
                                'dra_lock' => false
                            ]);

                            IrbFormHistory::create([
                                'irb_form_id' => $irbForm->id,
                                'user_id' => $user->id,
                                'status' => 'awaited',
                                'stage' => 'dordc',
                                'change' => "Form approved by HOD",
                            ]);

                        } else {
                            $this->handleRejectionHOD($irbForm, $request, $user);
                        }
                        return response()->json($student->getIrbFormWithHistory());
                    } else {
                        return response()->json(['message' => 'You are not authorized to access this resource'], 403);
                    }
                    
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


    protected function handleRejectionHOD($irbForm, $request, $user)
    {
        try {
            $irbForm->update([
                'stage' => 'student',
                'status' => 'rejected',
                'HODComments' => $request->comments,
            ]);
            IrbFormHistory::create([
                'irb_form_id' => $irbForm->id,
                'user_id' => $user->id,
                'status' => 'rejected',
                'stage' => 'hod',
                'change' => "Form rejected by HOD",
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }
    }
    private function sendToDRA($request)
    {
        try {
            $user = Auth::user();
            if ($user->role == 'dordc') {
                $request->validate([
                    'form_id' => 'required|integer',
                    'comments' => 'required|string',
                    'recommendation' => 'required|string',
                ]);
                $irbForm = IrbForm::find($request->form_id);

                if ($irbForm) {
                    $student = $irbForm->student;
                    if ($student->checkHOD($user->id)) {
                        if ($request->recommendation == 'approved') {
                            $irbForm->update([
                                'stage' => 'dra',
                                'status' => 'awaited',
                                'HODComments' => $request->comments,
                            ]);
                            IrbFormHistory::create([
                                'irb_form_id' => $irbForm->id,
                                'user_id' => $user->id,
                                'status' => 'awaited',
                                'stage' => 'dra',
                                'change' => "Form approved by DORDC",
                            ]);
                        } else {
                            $this->handleRejectionHOD($irbForm, $request, $user);
                        }
                    }
                    return response()->json($student->getIrbFormWithHistory());
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
    //TODO: DORDC functions
}
