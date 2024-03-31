<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Role;
class FacultyController extends Controller
{
    public function add(Request $request)
    {
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
}