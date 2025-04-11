<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Traits\FilterLogicTrait;
use App\Http\Controllers\Traits\GeneralFormCreate;
use App\Http\Controllers\Traits\GeneralFormHandler;
use App\Http\Controllers\Traits\GeneralFormList;
use App\Http\Controllers\Traits\GeneralFormSubmitter;
use App\Models\ExaminersRecommendation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Faculty;
use App\Models\Forms;
use App\Models\ListOfExaminers;
use App\Models\Role;
use App\Models\User;

//TODO: add outside expert not in the system


class ListOfExaminersController extends Controller
{
    use GeneralFormHandler;
    use GeneralFormSubmitter;
    use GeneralFormList;
    use GeneralFormCreate;
    use FilterLogicTrait;
    public function listFilters(Request $request){
        return response()->json($this->getAvailableFilters("forms"));
    }
    public function listForm(Request $request, $student_id = null)
    {
        $user = Auth::user();
        if ($student_id)
            return $this->listFormsStudent($user, ListOfExaminers::class, $student_id);
        return $this->listForms($user, ListOfExaminers::class,$request,null,false,[
            'fields' => [
                "name","roll_no","supervisors"
            ],
            'extra_fields' => [
                "supervisors" => function ($form) {
                return $form->student->supervisors->map(function ($supervisor) {
                    return $supervisor->user->name();
                })->join(', ');
                },
            ],
            'titles' => [ "Name", "Roll No","Supervisors"],
        ]);
    }

    public function createForm(Request $request)
    {
        $request->validate([
            'roll_no' => 'integer|required',
        ]);

        $user = Auth::user();
        $role = $user->current_role;
        $steps = [
            'faculty',
            'hod',
            'dordc',
            'director',
            'complete'
        ];
        if ($role->role != 'faculty') {
            return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }
        $data = [
            'roll_no' => $request->roll_no,
            'steps' => $steps,
            'role' => 'supervisor',
            'supervisor_lock'=>0,
            'name' => $user->first_name . ' ' . $user->last_name
        ];
        return $this->createForms(ListOfExaminers::class, $data,null,true);
    }
    public function bulkSubmit(Request $request)
    {
        $user = Auth::user();
        $role = $user->current_role;
       
        $allowedRoles = ['director'];
        if (!in_array($role->role, $allowedRoles)) {
            return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }
        $request->validate([
            'form_ids' => 'required|array',
            'approval' => 'required|boolean',
        ]);
        $request->merge(['approval' => true]);
        foreach ($request->form_ids as $form_id) {
            $this->submit($request, $form_id);
        }
    }
    public function loadForm(Request $request, $form_id = null)
    {
        $user = Auth::user();
        $role = $user->current_role;
        $model = ListOfExaminers::class;
        $steps = [
            'faculty',
            'hod',
            'dordc',
            'director',
        ];
        switch ($role->role) {
            case 'hod':
                return $this->handleHodForm($user, $form_id, $model);
            case 'dordc':
            case 'director':
                return $this->handleAdminForm($user, $form_id, $model);
            case 'faculty':
                return $this->handleFacultyForm($user, $form_id, $model);
            case 'admin':
                return $this->handleAdminForm($user, $form_id, $model,true);
           
            default:
                return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }
    }

    public function submit(Request $request, $form_id)
    {
        $user = Auth::user();
        $role = $user->current_role;

        switch ($role->role) {
            case 'faculty':
                return $this->supervisorSubmit($user, $request, $form_id);
            case 'hod':
                return $this->hodSubmit($user, $request, $form_id);
            case 'dordc':
                return $this->dordcSubmit($user, $request, $form_id);
            case 'director':
                return $this->directorSubmit($user, $request, $form_id);
            default:
                return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }
    }


    private function supervisorSubmit($user, Request $request, $form_id)
    {

        $request->merge(['approval' => true]);
        return $this->submitForm($user, $request, $form_id, ListOfExaminers::class, 'faculty', 'faculty', 'hod', function ($formInstance) use ($request, $user) {

            $request->validate([
                'national' => 'array|required',
                'international' => 'array|required',
            ]);

            $this->processExaminers($request->national, 'national', $formInstance, $user);

            $this->processExaminers($request->international, 'international', $formInstance, $user);

        });
    }

    private function hodSubmit($user, Request $request, $form_id)
    {

        return $this->submitForm(
            $user,
            $request,
            $form_id,
            ListOfExaminers::class,
            'hod',
            'faculty',
            'dordc',
        );
    }

    private function directorSubmit($user, Request $request, $form_id)
    {

        return $this->submitForm(
            $user,
            $request,
            $form_id,
            ListOfExaminers::class,
            'director',
            'dordc',
            'complete',
        );
    }



    private function dordcSubmit($user, Request $request, $form_id)
    {
        return $this->submitForm(
            $user,
            $request,
            $form_id,
            ListOfExaminers::class,
            'dordc',
            'hod',
            'director',
            function ($formInstance, $user) use ($request) {
                $request->validate([
                    'approvals' => "array | required",
                    'rejections' => "array | required",
                ]);
                $approvals = $request->approvals;
                foreach ($approvals as $email) {
                    $examiner = ExaminersRecommendation::where('form_id', $formInstance->id)
                        ->where('email', $email)
                        ->first();
                    if ($examiner) {
                        if($examiner->recommendation != 'approved'){
                            $examiner->recommendation = 'approved';
                            $examiner->save();
                            $formInstance->addHistoryEntry("DORDC approved examiner " . $examiner->name, $user->name());
                        }
                    }
                }
                $rejections = $request->rejections;
                foreach ($rejections as $email) {
                    $examiner = ExaminersRecommendation::where('form_id', $formInstance->id)
                        ->where('email', $email)
                        ->first();
                    if ($examiner) {
                        if($examiner->recommendation != 'rejected'){
                            $examiner->recommendation = 'rejected';
                            $examiner->save();
                            $formInstance->addHistoryEntry("DORDC rejected examiner " . $examiner->name, $user->name());
                        }
                    }
                }
                $examinersNationalCount = ExaminersRecommendation::where('form_id', $formInstance->id)
                    ->where('recommendation', 'approved')
                    ->where('type', 'national')
                    ->count();
                $examinersInternationalCount = ExaminersRecommendation::where('form_id', $formInstance->id)
                    ->where('recommendation', 'approved')
                    ->where('type', 'international')
                    ->count();
                $pendingExaminers = ExaminersRecommendation::where('form_id', $formInstance->id)
                    ->where('recommendation', 'pending')
                    ->count();
                if ($pendingExaminers > 0) {
                    throw new \Exception("All examiners must be either approved or rejected before the form can be submitted");
                }
                if($request->approval)
                if ($examinersNationalCount < 4 || $examinersInternationalCount < 4) {
                    $formInstance->supervisor_lock = false;
                    $index = array_search('faculty', $formInstance->steps);
                    $formInstance->update([
                        'stage' => 'supervisor',
                        'supervisor' . '_approval' => false,
                        'supervisor' . '_comments' => null,
                        'status' => 'pending',
                        'current_step' => $index,
                        'supervisor_lock'=>false,
                        'maximum_step' => $index > $formInstance->maximum_step ? $index : $formInstance->maximum_step,
                    ]);
                    throw new \Exception("Form Moved to Supervisor");
                }
            }
        );
    }

    // Generalized function to process examiners
    private function processExaminers($examiners, $type, $formInstance, $user, $requiredCount = 4)
    {
        if (!$examiners) {
            throw new \Exception(ucfirst($type) . ' Examiners are required');
        }
    
        // Check for duplicate examiners in the input
        $emails = array_column($examiners, 'email');
        if (count($emails) !== count(array_unique($emails))) {
            throw new \Exception("Duplicate examiners found in the $type list");
        }
    
        // Get the last form submitted by the faculty
        // $lastForm = ListOfExaminers::where('faculty_id', $user->faculty->faculty_code)
        //     ->where('id', '<', $formInstance->id) // Assuming `id` represents the chronological order of forms
        //     ->latest('id')
        //     ->first();
    
        // if ($lastForm) {
        //     // Get the examiners of the last form
        //     $lastFormExaminers = ExaminersRecommendation::where('form_id', $lastForm->id)
        //         ->where('type', $type)
        //         ->pluck('email')
        //         ->toArray();
    
        //     // Check for common examiners
        //     $commonExaminers = array_intersect($emails, $lastFormExaminers);
        //     if (count($commonExaminers) > 2) {
        //         throw new \Exception("The $type list cannot have more than 2 examiners in common with the last submitted form");
        //     }
        // }
    
        $count = 0;
        foreach ($examiners as $examiner) {
            $exists = ExaminersRecommendation::where('form_id', $formInstance->id)
                ->where('email', $examiner['email'])
                ->where('type', $type)
                ->first();
    
            if (!$exists) {
                ExaminersRecommendation::create([
                    'form_id' => $formInstance->id,
                    'name' => $examiner['name'],
                    'email' => $examiner['email'],
                    'institution' => $examiner['institution'],
                    'designation' => $examiner['designation'],
                    'department' => $examiner['department'],
                    'phone' => $examiner['phone'],
                    'faculty_id' => $user->faculty->faculty_code,
                    'type' => $type,
                ]);
                $formInstance->addHistoryEntry("Supervisor added Examiner to " . $type . " list", $user->name());
                $count++;
            } else {
                if ($exists->recommendation != 'rejected') {
                    $count++;
                }
            }
        }
    
        if ($count < $requiredCount) {
            throw new \Exception("Exactly $requiredCount $type examiners are required");
        }
    }
    
}
