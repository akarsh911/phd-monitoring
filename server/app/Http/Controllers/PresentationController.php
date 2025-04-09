<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Traits\FilterLogicTrait;
use Illuminate\Http\Request;
use App\Http\Controllers\Traits\GeneralFormHandler;
use App\Http\Controllers\Traits\GeneralFormList;
use App\Http\Controllers\Traits\GeneralFormSubmitter;
use App\Http\Controllers\Traits\HasSemesterCodeValidation;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Traits\SaveFile;

use App\Models\Patent;
use App\Models\Presentation;
use App\Models\PresentationReview;
use App\Models\Publication;
use App\Models\Student;
use App\Services\PresentationService;

use Carbon\Carbon;

class PresentationController extends Controller
{
    use GeneralFormHandler;
    use GeneralFormSubmitter;
    use GeneralFormList;
    use SaveFile;
    use FilterLogicTrait;
    use HasSemesterCodeValidation;

    public function listFilters(Request $request)
    {
        return response()->json($this->getAvailableFilters("presentation"));
    }
    public function listForm(Request $request, $student_id = null)
    {
        $user = Auth::user();

        return $this->listForms($user, Presentation::class, $request, null, true, [
            'fields' => [
                "name",
                "roll_no",
                "period",
                "date",
                "time",
                "progress",
                "supervisors"
            ],
            'extra_fields' => [
                "overall_progress" => function ($form) {
                    return $form->student->overall_progress;
                },
                "progress" => function ($form) {
                    return $form->progress;
                },
                "supervisors" => function ($form) {
                    return $form->student->supervisors->map(function ($supervisor) {
                        return $supervisor->user->name();
                    })->join(', ');
                },
                "date" => function ($form) {
                    return $form->date;
                },
                "time" => function ($form) {
                    return $form->time;
                },
                "period" => function ($form) {
                    return $form->period_of_report;
                },
            ],
            'titles' => ["Name", "Roll No", "Period", "Date", "Time", "Progress %", "Supervisors"],
        ]);
    }

    public function createForm(Request $request)
    {
        $user = Auth::user();
        $role = $user->current_role;
        $cur = $role->role;
        if ($cur == 'faculty' || $cur == 'phd_coordinator') {
            $request->validate([
                'student_id' => 'required|string',
                'date' => 'required|date',
                'time' => 'required|string',
                'period_of_report' => 'required|string',
                'guest_emails' => 'nullable|array',
                'guest_emails.*' => 'email',
            ]);
            $validator = $this->validateSemesterCode($request->period_of_report);
            if (!$validator['valid']) {
                return response()->json(['message' => 'Invalid Semester Code'], 422);
            }
            if (!$validator['current'] && !$validator['upcoming'] && !$validator['in_db']) {
                return response()->json(['message' => 'Presentation cannot be scheduled for Past Semester'], 422);
            }

            $student = Student::where('roll_no', $request->student_id)->first();
            if (!$student) {
                return response()->json(['message' => 'Student not found'], 404);
            }
            if (!$student->checkSupervises($user->faculty->faculty_code)) {
                return response()->json(['message' => 'You are not authorized to access this resource'], 403);
            }
            $old = Presentation::where('student_id', $request->student_id)->where('semester_id', $validator['semester_id'])->get();
            if (count($old) != 0) {
                return response()->json(['message' => 'Presentation already scheduled for this period'], 403);
            }

            $emails = $this->emailList($student, $request);
            $form = Presentation::create([
                'student_id' => $request->student_id,
                'date' => $request->date,
                'time' => $request->time,
                'period_of_report' => $request->period_of_report,
                'status' => 'pending',
                'completion' => 'incomplete',
                'semester_id' => $validator['semester_id'],
                'steps' => ['student', 'faculty', 'doctoral', 'hod', 'dra', 'dordc', 'complete'],
            ]);
            $calendarResult = PresentationService::scheduleCalendarEvent(
                "PhD Presentation - " . $student->user->name(),
                "Please Join for PhD Presentation of " . $student->user->name() . " scheduled for term " . $request->period_of_report . " scheduled by " . $user->first_name . " of Department " . $user->faculty->department->name,
                $request->date,
                $request->time,
                $emails ?? []
            );
            $form->venue = $calendarResult['event_link'];
            $form->save();
            $form->addHistoryEntry("Presentation Scheduled by Supervisor", $user->first_name);
            return response()->json($form);
        }
        return response()->json(['message' => 'You are not authorized to access this resource'], 403);
    }

    public function markLeave(Request $request)
    {
        $user = Auth::user();
        $role = $user->current_role;
        $cur = $role->role;
        if ($cur == 'faculty' || $cur == 'phd_coordinator') {
            $request->validate([
                'student_id' => 'required|string',
                'period_of_report' => 'required|string',
                'leave' => 'required|boolean',
            ]);
            $validator = $this->validateSemesterCode($request->period_of_report);
            if (!$validator['valid']) {
                return response()->json(['message' => 'Invalid Semester Code'], 422);
            }
            if (!$validator['current'] && !$validator['upcoming'] && !$validator['in_db']) {
                return response()->json(['message' => 'Presentation cannot be scheduled for Past Semester'], 422);
            }

            $student = Student::where('roll_no', $request->student_id)->first();
            if (!$student) {
                return response()->json(['message' => 'Student not found'], 404);
            }
            if (!$student->checkSupervises($user->faculty->faculty_code)) {
                return response()->json(['message' => 'You are not authorized to access this resource'], 403);
            }
            $old = Presentation::where('student_id', $request->student_id)->where('semester_id', $validator['semester_id'])->get()->first();
            if (count($old) != 0) {
                $old->leave = $request->leave;
                $old->save();
                $emails = $this->emailList($student, $request);
                //send calendar event cancellation email
                return response()->json(['message' => 'Leave marked successfully'], 200);
            } else {
                $form = Presentation::create([
                    'student_id' => $request->student_id,
                    'date' => $request->date,
                    'time' => $request->time,
                    'period_of_report' => $request->period_of_report,
                    'status' => 'pending',
                    'completion' => 'incomplete',
                    'semester_id' => $validator['semester_id'],
                    'steps' => ['student', 'faculty', 'doctoral', 'hod', 'dra', 'dordc', 'complete'],
                ]);
            }
        } else {
            return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }
    }

    public function createMultipleForm(Request $request)
    {
        $user = Auth::user();
        $role = $user->current_role;
        $cur = $role->role;

        if ($cur != 'faculty' && $cur != 'phd_coordinator') {
            return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }

        $request->validate([
            'semester' => 'required|string',
            'students' => 'required|array',
            'students.*.student_id' => 'required|integer',
            'students.*.date' => 'required|string',
            'students.*.time' => 'required|string',
            'students.*.guest_emails' => 'nullable|array',
        ]);
        $validator = $this->validateSemesterCode($request->semester);
        if (!$validator['valid']) {
            return response()->json(['message' => 'Invalid Semester Code'], 422);
        }
        if (!$validator['current'] && !$validator['upcoming'] && !$validator['in_db']) {
            return response()->json(['message' => 'Presentation cannot be scheduled for Past Semester'], 422);
        }

        $createdForms = [];
        $errors = [];

        foreach ($request->students as $studentData) {
            $student = Student::where('roll_no', $studentData['student_id'])->first();

            $formattedDate = Carbon::createFromFormat('d-m-Y', str_replace('/', '-', $studentData['date']))->format('Y-m-d');
            if (!$student) {
                $errors[] = ['student_id' => $studentData['student_id'], 'message' => 'Student not found'];
                continue;
            }

            if (!$student->checkSupervises($user->faculty->faculty_code) && !$student->department->checkCoordinates($user->faculty->faculty_code)) {
                $errors[] = ['student_id' => $studentData['student_id'], 'message' => 'Not authorized to schedule for student '];
                continue;
            }

            $existingPresentation = Presentation::where('student_id', $studentData['student_id'])
                ->where('semester_id', $validator['semester_id'])
                ->exists();

            if ($existingPresentation) {
                $errors[] = ['student_id' => $studentData['student_id'], 'message' => 'Presentation already scheduled for this period'];
                continue;
            }

            $form = Presentation::create([
                'student_id' => $studentData['student_id'],
                'semester_id' => $validator['semester_id'],
                'period_of_report' => $studentData['period_of_report'],
                'leave' => $studentData['leave'] ?? false,
                'status' => 'pending',
                'completion' => 'incomplete',
                'steps' => ['student', 'faculty', 'doctoral', 'hod', 'dra', 'dordc', 'complete'],
            ]);

            $emails = $this->emailList($student, $request);
            $calendarResult = PresentationService::scheduleCalendarEvent(
                "PhD Presentation - " . $student->user->name(),
                "Please Join for PhD Presentation of " . $student->user->name() . " scheduled for term " . $request->period_of_report . " scheduled by " . $user->first_name . " of Department " . $user->faculty->department->name,
                $formattedDate,
                $studentData['time'],
                $emails ?? []
            );
            $form->venue = $calendarResult['event_link'];
            $form->addHistoryEntry("Presentation Scheduled by Supervisor", $user->first_name);
            $createdForms[] = $form;
        }
        if ($errors) {
            return response()->json([
                'created_forms' => $createdForms,
                'errors' => $errors,
            ], 422);
        }
        return response()->json([
            'created_forms' => $createdForms,
            'errors' => $errors,
        ]);
    }
    public function loadForm(Request $request, $form_id = null)
    {
        $user = Auth::user();
        $steps = ['student', 'faculty', 'doctoral', 'hod', 'dra', 'dordc', 'complete'];
        $model = Presentation::class;
        $form = Presentation::find($form_id);
        $role = $user->current_role;
        $cur = $role->role;
        if ($form) {
            if ($form->student->checkDoctoralCommittee($user->faculty?->faculty_code)) {
                $cur = 'doctoral';
            }
        }

        switch ($cur) {
            case 'student':
                return $this->handleStudentForm($user, $form_id, $model, $steps);
            case 'hod':
                return $this->handleHodForm($user, $form_id, $model);
            case 'doctoral':
            case 'external':
                return $this->handledoctoralForm($user, $form_id, $model);
            case 'dra':
            case 'dordc':
                return $this->handleAdminForm($user, $form_id, $model);
            case 'faculty':
                return $this->handleFacultyForm($user, $form_id, $model);
            case 'admin':
                return $this->handleAdminForm($user, $form_id, $model, true);

            default:
                return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }
    }

    public function submit(Request $request, $form_id)
    {
        $user = Auth::user();
        $role = $user->current_role;
        $form = Presentation::find($form_id);
        $cur = $role->role;
        if ($form) {
            if ($form->student->checkDoctoralCommittee($user->faculty?->faculty_code)) {
                $cur = 'doctoral';
            }
        }
        switch ($cur) {
            case 'student':
                return $this->studentSubmit($user, $request, $form_id);
            case 'faculty':
                return $this->supervisorSubmit($user, $request, $form_id);
            case 'hod':
                return $this->hodSubmit($user, $request, $form_id);
            case 'dra':
                return $this->draSubmit($user, $request, $form_id);
            case 'dordc':
                return $this->dordcSubmit($user, $request, $form_id);
            case 'doctoral':
                return $this->doctoralSubmit($user, $request, $form_id);
            default:
                return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }
    }
    public function bulkSubmit(Request $request)
    {
        $user = Auth::user();
        $role = $user->current_role;
        $allowedRoles = ['hod', 'dra', 'dordc', 'doctoral'];
        if (!in_array($role->role, $allowedRoles)) {
            return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }
        $request->validate([
            'form_ids' => 'required|array',
            'form_ids.*' => 'exists:presentations,id',
        ]);
        $request->merge(['approval' => true]);
        foreach ($request->form_ids as $form_id) {
            $this->submit($request, $form_id);
        }
        return response()->json(['message' => 'Forms submitted successfully'], 200);
    }
    public function linkPublication(Request $request, $form_id)
    {
        try {
            $user = Auth::user();
            $role = $user->current_role;
            if ($role->role != 'student') {
                return response()->json(['message' => 'You are not authorized to access this resource'], 403);
            }
            $formInstance = Presentation::find($form_id);
            if (count($request->publications) != 0) {
                foreach ($request->publications as $publication) {
                    $publication = Publication::find($publication);
                    if (!$publication) {
                        throw new \Exception("Invalid publication selected");
                    }
                    if ($publication->student_id != $user->student->roll_no) {
                        throw new \Exception("Invalid publication selected");
                    }
                    $existingPublication = Publication::where('title', $publication->title)
                        ->where('form_id', $formInstance->id)
                        ->where('publication_type', $publication->publication_type)
                        ->where('form_type', 'progress')
                        ->first();
                    if ($existingPublication) {
                        throw new \Exception("Publication with the same title already linked to this form");
                    }
                    $newPublication = $publication->replicate();
                    $newPublication->form_id = $formInstance->id;
                    $newPublication->form_type = 'progress';

                    $newPublication->save();
                }
            }
            if (count($request->patents) != 0) {
                foreach ($request->patents as $patent) {
                    $patent = Patent::find($patent);
                    if (!$patent) {
                        throw new \Exception("Invalid patent selected");
                    }
                    if ($patent->student_id != $user->student->roll_no) {
                        throw new \Exception("Invalid patent selected");
                    }
                    $existingPatent = Patent::where('title', $patent->title)
                        ->where('form_id', $formInstance->id)
                        ->where('form_type', 'progress')
                        ->first();
                    if ($existingPatent) {
                        throw new \Exception("Patent with the same title  already linked to this form");
                    }
                    $newPatent = $patent->replicate();
                    $newPatent->form_id = $formInstance->id;
                    $newPatent->form_type = 'progress';
                    $newPatent->save();
                }
            }
            return response()->json(['message' => 'Publications linked to Presentation'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }

    public function unlinkPublication(Request $request, $form_id)
    {
        $user = Auth::user();
        $role = $user->current_role;
        if ($role->role != 'student') {
            return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }
        $formInstance = Presentation::find($form_id);
        if (count($request->publications) != 0) {
            foreach ($request->publications as $publication) {
                $publication = Publication::where('id', $publication)->where('form_id', $formInstance->id)->where('form_type', 'progress');
                $publication->delete();
            }
        }
        if (count($request->patents) != 0) {
            foreach ($request->patents as $patent) {
                $patent = Patent::where('id', $patent)->where('form_id', $formInstance->id)->where('form_type', 'progress');
                $patent->delete();
            }
        }
        return response()->json(['message' => 'Publications unlinked from Presentation'], 200);
    }

    private function studentSubmit($user, $request, $form_id)
    {
        $model = Presentation::class;

        return $this->submitForm(
            $user,
            $request,
            $form_id,
            $model,
            'student',
            'student',
            'faculty',
            function ($formInstance) use ($request, $user) {
                $request->validate([
                    'teaching_work' => 'required| in:UG,PG,Both,None',
                    'presentation_pdf' => 'required|file|mimes:pdf|max:2048',
                ]);


                $formInstance->teaching_work = $request->teaching_work;
                // $formInstance->no_paper_sci_journal=$request->no_paper_sci_journal;
                // $formInstance->no_paper_scopus_journal=$request->no_paper_scopus_journal;
                // $formInstance->no_paper_conference=$request->no_paper_conference;

                $formInstance->presentation_pdf = $this->saveUploadedFile($request->file('presentation_pdf'), 'presentation_pdf', $user->student->roll_no);

                $sups = $user->student->supervisors;
                foreach ($sups as $sup) {
                    PresentationReview::create([
                        'presentation_id' => $formInstance->id,
                        'faculty_id' => $sup->faculty_code,
                        'comments' => '',
                        'review_status' => 'pending',
                        'is_supervisor' => 1,
                    ]);
                }
            }
        );
    }

    private function supervisorSubmit($user, $request, $form_id)
    {
        $model = Presentation::class;

        return $this->submitForm(
            $user,
            $request,
            $form_id,
            $model,
            'faculty',
            'student',
            'doctoral',
            function ($formInstance) use ($request, $user) {
                if (!$formInstance->progress || !$formInstance->attendance || !$formInstance->contact_hours) {
                    $request->validate([
                        'progress' => 'required|integer|min:0|max:100',
                        'attendance' => 'required|numeric|min:0|max:100',
                        'contact_hours' => 'required|integer|min:0',
                    ]);
                    $formInstance->progress = $request->progress;
                    $formInstance->attendance = $request->attendance;
                    $formInstance->contact_hours = $request->contact_hours;
                    $formInstance->current_progress = $formInstance->student->overall_progress;
                    $formInstance->total_progress = $formInstance->student->overall_progress + $request->progress;
                    $formInstance->save();
                }
                $alreadyReviewed = PresentationReview::where('presentation_id', $formInstance->id)->where('faculty_id', $user->faculty->faculty_code)->first();

                if ($alreadyReviewed->review_status == 'completed') {
                    throw new \Exception("You have already reviewed this form");
                }

                if ($request->approval) {
                    PresentationReview::where('presentation_id', $formInstance->id)->where('is_supervisor', 1)->where('faculty_id', $user->faculty->faculty_code)
                        ->update(['progress' => 'satisfactory', 'review_status' => 'completed', 'comments' => $request->comments]);
                    $approvals = PresentationReview::where('presentation_id', $formInstance->id)->where('is_supervisor', 1)->where('review_status', 'pending')->get();
                    if (count($approvals) != 0) {
                        throw new \Exception("Your Prefrences have been saved. Please wait for other supervisors to approve", 201);
                    } else {
                        $doctoral = $formInstance->student->doctoralCommittee;
                        foreach ($doctoral as $doc) {
                            PresentationReview::create([
                                'presentation_id' => $formInstance->id,
                                'faculty_id' => $doc->faculty_code,
                                'comments' => '',
                                'review_status' => 'pending',
                                'is_supervisor' => 0,
                            ]);
                        }
                    }
                }
            }
        );
    }

    private function doctoralSubmit($user, $request, $form_id)
    {
        $model = Presentation::class;

        return $this->submitForm(
            $user,
            $request,
            $form_id,
            $model,
            'doctoral',
            'faculty',
            'hod',
            function ($formInstance) use ($request, $user) {
                $alreadyReviewed = PresentationReview::where('presentation_id', $formInstance->id)->where('is_supervisor', 0)->where('faculty_id', $user->faculty->faculty_code)->first();

                if ($alreadyReviewed->review_status == 'completed') {
                    throw new \Exception("You have already reviewed this form");
                }

                if ($request->approval) {
                    PresentationReview::where('presentation_id', $formInstance->id)->where('faculty_id', $user->faculty->faculty_code)
                        ->update(['progress' => 'satisfactory', 'review_status' => 'completed', 'comments' => $request->comments]);
                }
                $approvals = PresentationReview::where('presentation_id', $formInstance->id)->where('is_supervisor', 0)->where('review_status', 'pending')->get();
                if (count($approvals) != 0) {
                    throw new \Exception("Your Prefrences have been saved. Please wait for other supervisors to approve", 201);
                }
                throw new \Exception("You have already reviewed this form");
            }
        );
    }

    private function hodSubmit($user, $request, $form_id)
    {
        $model = Presentation::class;
        return $this->submitForm(
            $user,
            $request,
            $form_id,
            $model,
            'hod',
            'dra',
            'dra',
        );
    }

    private function dordcSubmit($user, $request, $form_id)
    {
        $model = Presentation::class;
        return $this->submitForm(
            $user,
            $request,
            $form_id,
            $model,
            'dordc',
            'dra',
            'dra',
            function ($formInstance) use ($request, $user) {
                if ($request->approval) {
                    $formInstance->completion = 'complete';
                    $formInstance->status = 'approved';
                    $formInstance->addHistoryEntry("Thesis approved by DORDC", $user->name());
                }
            }
        );
    }

    private function draSubmit($user, $request, $form_id)
    {
        $model = Presentation::class;
        return $this->submitForm(
            $user,
            $request,
            $form_id,
            $model,
            'dra',
            'dordc',
            'complete',
            function ($formInstance) use ($request, $user) {
                $formInstance->student->current_progress = $formInstance->total_progress;
                $formInstance->student->save();
                $formInstance->addHistoryEntry("Presentation marked as completed by DRA", $user->name());
            }
        );
    }
    private function emailList($student, $request)
    {
        $emails = [];

        $supervisorEmails = $student->supervisors?->map(function ($supervisor) {
            return $supervisor->user?->email;
        })->filter()->values()->all() ?? [];
        $emails = array_merge($emails, $supervisorEmails);

        $guestEmails = is_array($request->guest_emails) ? array_filter($request->guest_emails) : [];
        $emails = array_merge($emails, $guestEmails);

        $committeeEmails = $student->doctoralCommittee?->map(function ($supervisor) {
            return $supervisor->user?->email;
        })->filter()->values()->all() ?? [];

        $emails = array_merge($emails, $committeeEmails);


        $coordinatorEmails = $student->department?->phdCoordinators?->pluck('email')->filter()->values()->all() ?? [];
        $emails = array_merge($emails, $coordinatorEmails);


        $hodEmail = optional($student->department?->hod?->user)->email;
        if ($hodEmail) {
            $emails[] = $hodEmail;
        }

        // Student's own email
        $studentEmail = optional($student->user)->email;
        if ($studentEmail) {
            $emails[] = $studentEmail;
        }

        $emails = array_values(array_filter(array_unique($emails)));
        return $emails;
    }
}
