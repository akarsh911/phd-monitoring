<?php

namespace App\Http\Controllers;

use App\Models\Forms;
use Illuminate\Http\Request;    
use Illuminate\Support\Facades\Auth;
use App\Models\Role;
use App\Models\Student;
use Illuminate\Support\Str;

class StudentController extends Controller {

    public function add(Request $request)
    {
        $loggenInUser = Auth::user();
        if($loggenInUser->current_role->can_add_student == 'false'){
            return response()->json([
                'message' => 'You do not have permission to create student'
            ], 403);
        }
        $role_id=Role::where('role','student')->first()->id;
        $request->validate(
            [
                'first_name' => 'required|string',
                'last_name' => 'required|string',
                'phone' => 'required|string',
                'email' => 'required|email|unique:users',
                'roll_no' => 'required|string',
                'department_id' => 'required|integer',
                'date_of_registration' => 'required|date',
                'date_of_irb' => 'required|date',
                'phd_title' => 'required|string',
                'fathers_name' => 'required|string',
                'address' => 'required|string',
                'current_status' => 'required|string',
                'overall_progress' => 'required|decimal:0,3',
                'cgpa' => 'required|decimal:0,3'
               

            ]
        );
        $password = Str::password(8, true, true, true, false);
        //generated a random password for the new user he will change it later

        $user = new \App\Models\User();
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->phone = $request->phone;
        $user->email = $request->email;
        $user->password = bcrypt($password);
        $user->address = $request->address;
        $user->role_id = $role_id;
        //crate new entry in users table


        $role_id = Role::where('role','student')->first()->id;
        $user->current_role_id = $role_id;
        $user->save();
        //fetch role id of student and save it in user table

        $student = new \App\Models\Student();
        $student->user_id = $user->id;
        $student->roll_no = $request->roll_no;
        $student->department_id = $request->department_id;
        $student->date_of_registration = $request->date_of_registration;
        $student->date_of_irb = $request->date_of_irb;
        $student->phd_title = $request->phd_title;
        $student->fathers_name = $request->fathers_name;
        $student->current_status = $request->current_status;
        $student->address = $request->address;
        $student->cgpa = $request->cgpa;
        if($request->has('overall_progress'))
             $student->overall_progress = $request->overall_progress;
        else
             $student->overall_progress = 0.0;
        
     

        $student->save();
        //create new entry in students table
        Forms::create([
            'student_id' => $student->roll_no,
            'department_id' => $student->department_id,
            'count'=>0,
            'student_available'=>true,
            'form_type'=>'supervisor-allocation',
            'form_name'=>'Supervisor Allocation Form',            
        ]);
        return response()->json($password,200);
        //return the password to the user
        //TODO: Send email to the user with the password        
    }
    public function list(Request $request)
    {
        $loggedInUser = Auth::user();
        $role = $loggedInUser->current_role->role;
    
        // Use eager loading to optimize performance
        switch ($role) {
            case 'admin':
            case 'director':
            case 'dra':
            case 'dordc':
                $students = Student::with(['user', 'department', 'supervisors.user'])->get();
                break;
            case 'hod':
            case 'phd_coordinator':
                $students = Student::with(['user', 'department', 'supervisors.user'])
                    ->where('department_id', $loggedInUser->faculty->department_id)
                    ->get();
                break;
            case 'faculty':
                $students = $loggedInUser->faculty->supervisedStudents;
                break;
            case 'student':
                $students = Student::with(['user', 'department', 'supervisors.user'])
                    ->where('user_id', $loggedInUser->id)
                    ->get();
                break;
            default:
                return response()->json([
                    'message' => 'You do not have permission to view students'
                ], 403);
        }
        $result=[];
        foreach($students as $student){
                $result[]=[
                    'name' => $student->user->name(),
                    'phd_title' => $student->phd_title,
                    'overall_progress' => $student->overall_progress,
                    'roll_no' => $student->roll_no,
                    'department' => $student->department->name,
                    'supervisors' => $student->supervisors->map(function ($supervisor) {
                        return $supervisor->user->name();
                    }),
                    'cgpa' => $student->cgpa,
                    'email' => $student->user->email,
                    'phone' => $student->user->phone,
                    'current_status' => $student->current_status,
                    'fathers_name' => $student->fathers_name,
                    'address' => $student->address,
                    'date_of_registration' => $student->date_of_registration,
                    'date_of_irb' => $student->date_of_irb,
                    'date_of_synopsis' => $student->date_of_synopsis,
                ];
        }
    
        return response()->json($result, 200);
    }
    

    public function get(Request $request, $roll_no)
    {
        $loggenInUser = Auth::user();
        $role=$loggenInUser->current_role->role;
        switch($role){
            case 'admin':
            case 'director':
            case 'dra':
            case 'dordc':
                $student = Student::find($roll_no);
                break;
            case 'hod':
            case 'phd_coordinator':
                $student = Student::where('department_id',$loggenInUser->faculty->department_id)->where('roll_no',$roll_no)->first();
                break;
            case 'faculty':
                $student = $loggenInUser->faculty->students()->where('roll_no',$roll_no)->first();
                break;
            case 'student':
                $student = Student::where('user_id',$loggenInUser->id)->where('roll_no',$roll_no)->first();
                break;
            default:
                return response()->json([
                    'message' => 'You do not have permission to view student'
                ], 403);
        }
        if($student == null){
            return response()->json([
                'message' => 'Student not found'
            ], 404);
        }
        return response()->json($student,200);
    }
}
