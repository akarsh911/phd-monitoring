<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SupervisorController extends Controller
{

    public function assign(Request $request)
    {
        $loggenInUser = Auth::user();
        if($loggenInUser->current_role->can_edit_supervisors == 'false'){
            return response()->json([
                'message' => 'You do not have permission to create supervisor'
            ], 403);
        }

        $request->validate(
            [
                'student_id' => 'required|integer',
                'faculty_id' => 'required|integer',
            ]
        );
        $supervisor = new \App\Models\Supervisor();
        // $supervisor->name = $request->name;
        $supervisor->student_id = $request->student_id;
        $supervisor->faculty_id = $request->faculty_id;
        // $supervisor->department_id = $request->department_id;
        $supervisor->save();

        return response()->json([
            'message' => 'Supervisor added successfully'
        ], 200);
    }
}