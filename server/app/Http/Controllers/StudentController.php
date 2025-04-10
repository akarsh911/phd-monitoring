<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Traits\FilterLogicTrait;
use App\Http\Controllers\Traits\GeneralFormList;
use App\Http\Controllers\Traits\PagenationTrait;
use App\Models\Forms;
use Illuminate\Http\Request;    
use Illuminate\Support\Facades\Auth;
use App\Models\Role;
use App\Models\Student;
use Illuminate\Support\Str;

class StudentController extends Controller {
    use FilterLogicTrait;
    use PagenationTrait;
    use GeneralFormList;
    public function listFilters(Request $request){
        return response()->json($this->getAvailableFilters("student"));
    }
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
                'date_of_irb' => 'nullable|date',
                'phd_title' => 'nullable|string',
                'fathers_name' => 'nullable|string',
                'address' => 'nullable|string',
                'current_status' => 'required|string',
                'overall_progress' => 'nullable|decimal:0,3',
                'cgpa' => 'nullable|decimal:0,3'
               
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
    $filters = $request->input('filters', []);
    $perPage = $request->input('rows', 15);
    $page = $request->input('page', 1);
    $filtersJson = $request->query('filters');

    if ($filtersJson) {
          $filters = json_decode(urldecode($filtersJson), true);
    }

    $studentsQuery = Student::with(['user', 'department', 'supervisors.user', 'doctoralCommittee.user']);

    switch ($role) {
        case 'hod':
        case 'phd_coordinator':
            $studentsQuery->where('department_id', $loggedInUser->faculty->department_id);
            break;
        case 'faculty':
            $studentsQuery = $loggedInUser->faculty->supervisedStudents()->with(['user', 'department', 'supervisors.user', 'doctoralCommittee.user']);
            break;
        case 'doctoral':
        case 'external':
            $studentsQuery = $loggedInUser->faculty->doctoredStudents()->with(['user', 'department', 'supervisors.user', 'doctoralCommittee.user']);
            break;
        case 'student':
            $studentsQuery->where('user_id', $loggedInUser->id);
            break;
        case 'admin':
        case 'director':
        case 'dra':
        case 'dordc':
            break;
        default:
            return response()->json(['message' => 'You do not have permission to view students'], 403);
    }

    if ($filters) {
        $studentsQuery = $this->applyDynamicFilters($studentsQuery, $filters);
    }
    
    $students = $studentsQuery->paginate($perPage, ['*'], 'page', $page);
    $result = $students->getCollection()->map(function ($student) {
        return $this->ListStudentProfile($student);
    });

    return response()->json([
        'data' => $result,
        'total' => $students->total(),
        'per_page' => $students->perPage(),
        'current_page' => $students->currentPage(),
        'totalPages' => $students->lastPage(),
        'role' => $role,
         'fields'=>['name','phd_title','roll_no','overall_progress','department','email','phone','current_status'],
         'fieldsTitles'=>['Name','PhD Title','Roll No','Overall Progress','Department','Email','Phone','Current Status'],
    ]);
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
                $student =  Student::find($roll_no);
                if(!$student->checkSupervises($loggenInUser->faculty->faculty_code))
                    return response()->json([
                        'message' => 'You do not have permission to view student'
                    ], 403);
               break;
            case 'student':
                $student = Student::where('user_id',$loggenInUser->id)->where('roll_no',$roll_no)->first();
                break;
            default:
                return response()->json([
                    'message' => 'You do not have permission to view student'
                ], 403);
        }
        if(!$student){
            return response()->json([
                'message' => 'Student not found'
            ], 404);
        }
        $stu= $this->ListStudentProfile($student);
        return response()->json([
            'data'=>[$stu]
        ],200);
    }
}
