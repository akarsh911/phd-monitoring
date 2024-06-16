<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Role;
use Illuminate\Support\Facades\Auth;
class FacultyController extends Controller
{
    public function add(Request $request)
    {

        $user = Auth::user();

        if(!$user->role->can_add_faulty)
        {
            return response()->json([
                'message' => 'You do not have permission to add faculty'
            ], 403);
        }
      
        $request->validate(
            [
                'first_name' => 'required|string',
                'last_name' => 'required|string',
                'email' => 'required|email',
                'phone' => 'required|string',
                'department_id' => 'required|integer',
                'designation' => 'required|string',
                'faculty_code' => 'required|string',
            ]
        );

        $password = $password = Str::password(8, true, true, true, false);

        $user = new \App\Models\User();
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->phone = $request->phone;
        $user->email = $request->email;
        $user->password = bcrypt($password);

        $role_id = Role::where('role','faculty')->first()->id;
        $user->role_id = $role_id;
        $user->save();

        $faculty = new \App\Models\Faculty();
        $faculty->user_id = $user->id;
        $faculty->department_id = $request->department_id;
        $faculty->designation = $request->designation;
        $faculty->faculty_code = $request->faculty_code;
        $faculty->save();


        return response()->json([
            'message' => 'Faculty added successfully',
            'password' => $password
        ], 200);
    }

    public function list(Request $request)
    {
        $user = Auth::user();
         if($user->role->can_read_all_faculties==true)
         {
            $faculties = \App\Models\Faculty::all();
            return response()->json($faculties, 200);
         }
         else if($user->role->can_read_department_faculties==true)
         {
            $faculties = \App\Models\Faculty::where('department_id', $user->faculty->department_id)->get();
            return response()->json($faculties, 200);         
         }
            else
            {
                return response()->json([
                    'message' => 'You do not have permission to view faculties'
                ], 403);
            }
        $faculties = \App\Models\Faculty::all();
        return response()->json($faculties, 200);
    }
}