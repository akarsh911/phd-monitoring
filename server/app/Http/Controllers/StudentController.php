<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;    
use Illuminate\Support\Facades\Auth;
use App\Models\Role;
use Illuminate\Support\Str;

class StudentController extends Controller {

    public function add(Request $request)
    {
        $loggenInUser = Auth::user();
        if($loggenInUser->role->can_add_student == 'false'){
            return response()->json([
                'message' => 'You do not have permission to create student'
            ], 403);
        }
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
        //crate new entry in users table


        $role_id = Role::where('role','student')->first()->id;
        $user->role_id = $role_id;
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

        return response()->json($password,200);
        //return the password to the user
        //TODO: Send email to the user with the password        
    }
}
