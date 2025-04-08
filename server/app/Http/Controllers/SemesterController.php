<?php

namespace App\Http\Controllers;

use App\Models\Semester;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SemesterController extends Controller
{
    public function getRecent(Request $request)
    {
        $user = Auth::user();
        $curr_role=$user->current_role->role;
        if($user->current_role->role!='dordc'&&
            $user->current_role->role!='hod'&&
            $user->current_role->role!='admin' ){
            return response()->json([
                'status' => 'error',
                'message' => 'You do not have permission to view semesters.',
            ], 403);
        }
       
        $semesters = Semester::latest('start_date')->first();
        if (!$semesters) {
            return response()->json([
                'status' => 'error',
                'message' => 'No semesters found.',
            ], 404);
        }
        if($curr_role!='hod')
        return response()->json([
            'status' => 'success',
            'data' => [
                'semester_name' => $semesters->semester_name,
                'start_date' => $semesters->start_date,
                'end_date' => $semesters->end_date,
                'year' => $semesters->year,
                'semester_off' => $semesters->studentsOnSemesterOff->count(),
                'leave'=>$semesters->presentationsLeave->count(),
                'missed'=>$semesters->presentationsMissed->count(),
                'scheduled'=>$semesters->scheduledPresentations->count(),
                'unscheduled'=>$semesters->unscheduledStudents->count(),
            ],
        ]);
        $dep_id = $user->faculty->department->id;

        return response()->json([
            'status' => 'success',
            'data' => [
                'semester_name' => $semesters->semester_name,
                'start_date' => $semesters->start_date,
                'end_date' => $semesters->end_date,
                'year' => $semesters->year,
                'semester_off' => $semesters->studentsOnSemesterOff->where('department_id', $dep_id)->count(),
        
                'leave' => $semesters->presentationsLeave->where('student.department_id', $dep_id)->count(),
                'missed' => $semesters->presentationsMissed->where('student.department_id', $dep_id)->count(),
                'scheduled' => $semesters->scheduledPresentations->where('student.department_id', $dep_id)->count(),
        
                'unscheduled' => $semesters->unscheduledStudents->where('department_id', $dep_id)->count(),
            ],
        ]);
        
    }

    public function create(Request $request)
    {
        $validated = $request->validate([
            'semester_name' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
        ]);
        $user = Auth::user();
        if($user->current_role->role!='dordc'&&
            $user->current_role->role!='admin'){
            return response()->json([
                'status' => 'error',
                'message' => 'You do not have permission to create a semester.',
            ], 403);
        }
        $semester = Semester::createOrUpdateFromCode($request->semester_name, $request->start_date, $request->end_date);
        
        return response()->json([
            'status' => 'success',
            'data' => $semester,
        ]);
    }



}
