<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Traits\GeneralFormList;
use App\Models\Semester;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SemesterController extends Controller
{
    use GeneralFormList;
    public function getRecent(Request $request)
    {
        $user = Auth::user();
        $curr_role = $user->role->role;
      

        if (
            $curr_role != 'dordc' &&
            $curr_role != 'hod' &&
            $curr_role != 'admin'
        ) {
            $semesters = Semester::latest('start_date')->first();
            if (!$semesters) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'No semesters found.',
                ], 404);
            }
            return response()->json([
                'status' => 'success',
                'data' => [
                    'semester_name' => $semesters->semester_name,
                    'start_date' => $semesters->start_date,
                    'end_date' => $semesters->end_date,
                ],
            ]);
        }

        $semesters = Semester::latest('start_date')->first();
        if (!$semesters) {
            return response()->json([
                'status' => 'error',
                'message' => 'No semesters found.',
            ], 404);
        }
        if ($curr_role != 'hod')
            return response()->json([
                'status' => 'success',
                'data' => $this->ListSemester($semesters),
            ]);
        $dep_id = $user->faculty->department->id;

        return response()->json([
            'status' => 'success',
            'data' => $this->ListSemesterDepartment($semesters, $dep_id),
        ]);
    }

    public function create(Request $request)
    {
        $validated = $request->validate([
            'semester_name' => 'required|string|max:255',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after:start_date',
            'notification' => 'nullable|boolean',
        ]);
       
        $user = Auth::user();
        if (
            $user->role->role != 'dordc' &&
            $user->role->role != 'admin'
        ) {
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
