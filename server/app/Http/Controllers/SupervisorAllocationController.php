<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Traits\GeneralFormHandler;
use App\Http\Controllers\Traits\GeneralFormList;
use App\Http\Controllers\Traits\GeneralFormSubmitter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\IrbSubForm;
use App\Http\Controllers\Traits\SaveFile;
use App\Models\BroadAreaSpecialization;
use App\Models\Faculty;
use App\Models\Supervisor;
use App\Models\SupervisorAllocation;

class SupervisorAllocationController extends Controller
{
    use GeneralFormHandler;
    use GeneralFormSubmitter;
    use GeneralFormList;

    public function listForm(Request $request, $student_id = null)
    {
        $user = Auth::user();
        return $this->listForms($user, SupervisorAllocation::class);
    }

    public function loadForm(Request $request, $form_id = null)
    {
        $user = Auth::user();
        $role = $user->role;
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
        $role = $user->role;

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
                    if (!BroadAreaSpecialization::find($area)) {
                        throw new \Exception("Invalid broad area selected");
                    }
                    $formInstance->student->broad_area_specialization()->create([
                        'specialization_id' => $area,
                        'student_id' => $formInstance->student_id,
                    ]);
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
            'hod',
            function ($formInstance) use ($request, $user) {
                if ($request->approval) {
                    $supervisors = $formInstance->supervisors;
                    foreach ($supervisors as $supervisor) {
                        Supervisor::create([
                            'student_id' => $formInstance->student_id,
                            'faculty_id' => $supervisor,
                        ]);
                    }
                    $formInstance->addHistoryEntry("Supervisors allocated by HOD", $user->name());
                }
            }
        );
    }
}
