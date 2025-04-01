<?php
namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Faculty;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use League\Csv\Reader;
use Maatwebsite\Excel\Facades\Excel;

class FacultyController extends Controller
{
    public function add(Request $request)
    {

        $user = Auth::user();

        if(!$user->role->can_add_faculties)
        {
            echo $user->current_role;
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

    public function showUploadForm()
    {
        return view('upload-faculty');
    }

    public function upload(Request $request)
{
    $request->validate([
        'file' => 'required|mimes:csv,txt'
    ]);

    $file = $request->file('file');
    $path = $file->getRealPath();

    try {
        $csv = Reader::createFromPath($path, 'r');
        $csv->setHeaderOffset(0); // Assuming your CSV has headers

        $records = $csv->getRecords();

        foreach ($records as $record) {
            Log::info('Processing record: ', $record);

            $user = User::where('email', $record['email'])->first();
            
            if (!$user) {
                $user = User::create([
                    'first_name' => $record['name'],
                    'last_name' => '',
                    'email' => $record['email'],
                    'password' => Hash::make("Hello@123"),
                    'role_id' => 1,
                ]);
                Log::info('Created new user: ' . $user->email);
            } else {
                Log::info('User already exists: ' . $user->email);
            }

            $dep = Department::where('code', $record['department'])->first();
            
            if (!$dep) {
                $dep = Department::create([
                    'code' => $record['department'],
                    'name' => $record['department'],
                ]);
                Log::info('Created new department: ' . $dep->code);
            } else {
                Log::info('Department already exists: ' . $dep->code);
            }

            $facultyExists = Faculty::where('faculty_code', $record['faculty_code'])->first();

            if (!$facultyExists) {
                Faculty::create([
                    'faculty_code'=> $record['faculty_code'],
                    'department_id' => $dep->id,
                    'user_id' => $user->id,
                    'designation' => $record['designation'],
                ]);
                Log::info('Created new faculty: ' . $record['faculty_code']);
            } else {
                Log::warning('Faculty already exists: ' . $record['faculty_code']);
            }
        }

        Log::info('Faculty list uploaded successfully.');
        return redirect()->back()->with('success', 'Faculty list uploaded successfully!');

    } catch (\Exception $e) {
        Log::error('Error uploading file: ' . $e->getMessage());
        return redirect()->back()->with('error', 'An error occurred while uploading the file.');
    }
}
}