<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Traits\GeneralFormCreate;
use App\Http\Controllers\Traits\GeneralFormHandler;
use App\Http\Controllers\Traits\GeneralFormList;
use App\Http\Controllers\Traits\GeneralFormSubmitter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\BroadAreaSpecialization;
use App\Models\Faculty;
use App\Models\Forms;
use App\Models\Supervisor;
use App\Models\SupervisorAllocation;

class SupervisorAllocationController extends Controller
{
    use GeneralFormHandler;
    use GeneralFormSubmitter;
    use GeneralFormList;
    use GeneralFormCreate;
  
    public function listForm(Request $request, $student_id = null)
    {
        $user = Auth::user();
        if($student_id)
        return $this->listFormsStudent($user, SupervisorAllocation::class, $student_id);
        return $this->listForms($user, SupervisorAllocation::class,$request,null,false,[
            'fields' => [
                "name","roll_no", "progress","email","semester"
            ],
            'extra_fields' => [
               "progress" => function ($form) {
                    return $form->student->overall_progress;
                },
                "email" => function ($form) {
                    return $form->student->user->email;
                },
                "semester" => function ($form) {
                    return $form->id;
                },
            ],
            'titles' => [ "Name", "Roll No", "Progress", "Email","Semester",],
        ]);
    }

    public function createForm(Request $request)
    {
        $user = Auth::user();
        $role = $user->current_role;
        $steps = [
            'student',
            'phd_coordinator',
            'hod',
            'complete'
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
        return $this->createForms(SupervisorAllocation::class, $data);
    }

    public function loadForm(Request $request, $form_id = null)
    {
        $user = Auth::user();
        $role = $user->current_role;
        $model = SupervisorAllocation::class;
        $steps = [
            'student',
            'phd_coordinator',
            'hod',
        ];
        switch ($role->role) {
            case 'student':
                return $this->handleStudentForm($user, $form_id, $model, $steps);
            case 'hod':
                return $this->handleHodForm($user, $form_id, $model);
            case 'phd_coordinator':
                return $this->handleCoordinatorForm($user, $form_id, $model);
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
            case 'hod':
                return $this->hodSubmit($user, $request, $form_id);
            case 'phd_coordinator':
                return $this->coordinatorSubmit($user, $request, $form_id);
            default:
                return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }
    }

    public function bulkSubmit(Request $request)
    {
        $user = Auth::user();
        $role = $user->current_role;
        $request->validate([
            'form_ids' => 'array|required',
        ]);
        if ($role->role != 'hod') {
            return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }
        $request->merge(['approval' => true]);
        foreach ($request->form_ids as $form_id) {
            $this->submit($request, $form_id);
        }
        return response()->json(['message' => 'Form submitted successfully'], 200);
    }

    private function studentSubmit($user, $request, $form_id)
    {
        $model = SupervisorAllocation::class;

        return $this->submitForm(
            $user,
            $request,
            $form_id,
            $model,
            'student',
            'student',
            'phd_coordinator',
            function ($formInstance) use ($request, $user) {
                $request->validate([
                    'prefrences' => 'required|array',
                    'broad_area_of_research' => 'required|array',
                ]);
                $prefrences = $request->prefrences;
                if (count($prefrences) != 6 || count(array_unique($prefrences)) != 6) {
                    throw new \Exception("Please select 6 unique prefrences");
                }
                $i = 1;
                foreach ($prefrences as $prefrence) {
                    if (!Faculty::find($prefrence)) {
                        throw new \Exception("Invalid prefrence selected");
                    }
                }
                $formInstance->prefrences = $prefrences;
                $areas = $request->broad_area_of_research;
                $formInstance->student->broad_area_specialization()->delete(); // Remove existing associations

                foreach ($areas as $area) {
                    if(!is_numeric($area)) {
                        $area=BroadAreaSpecialization::create([
                            'broad_area' => $area,
                            'department_id' => $formInstance->student->department_id,
                        ]);
                        $formInstance->student->broad_area_specialization()->create([
                            'specialization_id' => $area->id,
                            'student_id' => $formInstance->student_id,
                        ]);
                    }
                    else{
                    if (!BroadAreaSpecialization::find($area)) {
                        throw new \Exception("Invalid broad area selected");
                    }
                    $formInstance->student->broad_area_specialization()->create([
                        'specialization_id' => $area,
                        'student_id' => $formInstance->student_id,
                    ]);}
                }
            }
        );
    }
    private function coordinatorSubmit($user, $request, $form_id)
    {
        $model = SupervisorAllocation::class;
      
        return $this->submitForm(
            $user,
            $request,
            $form_id,
            $model,
            'phd_coordinator',
            'student',
            'hod',
            function ($formInstance) use ($request, $user) {
                $request->validate([
                    'supervisors' => 'required|array',
                ]);
                $supervisors = $request->supervisors;
                if (count($supervisors) != count(array_unique($supervisors))) {
                    throw new \Exception("Please select unique supervisors");
                }
                foreach ($supervisors as $supervisor) {
                    if (!Faculty::find($supervisor)) {
                        throw new \Exception("Invalid supervisor selected");
                    }
                }
                $formInstance->supervisors = $supervisors;
            }
        );
    }

    private function hodSubmit($user, $request, $form_id)
    {
        $model = SupervisorAllocation::class;
        return $this->submitForm(
            $user,
            $request,
            $form_id,
            $model,
            'hod',
            'phd_coordinator',
            'complete',
            function ($formInstance) use ($request, $user) {
             
                if ($request->approval) {
                   
                    $formInstance->status='approved';
                    
                    $supervisors = $formInstance->supervisors;
                    foreach ($supervisors as $supervisor) {
                        Supervisor::create([
                            'student_id' => $formInstance->student_id,
                            'faculty_id' => $supervisor,
                        ]);
                    }
                    $student = $formInstance->student;
                    $forms = [
                        [
                            'form_type' => 'irb-constitution',
                            'form_name' => 'Constitute of IRB',
                            'max_count' => 1,
                            'stage' => 'student',
                        ],
                        [
                            'form_type' => 'supervisor-change',
                            'form_name' => 'Supervisor Change',
                            'max_count' => 10,
                            'stage' => 'student',
                        ],
                        [
                            'form_type' => 'status-change',
                            'form_name' => 'Change of Status',
                            'max_count' => 2,
                            'stage' => 'student',
                        ],
                        [
                            'form_type' => 'semester-off',
                            'form_name' => 'Semester Off',
                            'max_count' => 10,
                            'stage' => 'student',
                        ],
                        [
                            'form_type' => 'list-of-examiners',
                            'form_name' => 'List of Examiners',
                            'student_available' => false,
                            'supervisor_available' => true,
                            'max_count' => 1,
                            'stage' => 'supervisor',
                        ],
                    ];

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

                    $formInstance->addHistoryEntry("Supervisors allocated by HOD", $user->name());
                }
            }
        );
    }
}
