<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Traits\FilterLogicTrait;
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
    use FilterLogicTrait;
    public function listFilters(Request $request){
        return response()->json($this->getAvailableFilters("faculty"));
    }
    public function add(Request $request)
    {

        $user = Auth::user();

        if(!$user->role->can_add_faculties)
        {
            return response()->json([
                'message' => 'You do not have permission to add faculty'
            ], 403);
        }
      
        $validationRules = [
            'first_name' => 'required|string',
            'last_name' => 'nullable|string',
            'email' => 'required|email|unique:users,email',
            'phone' => 'required|string',
            'department_id' => 'nullable|integer',
            'designation' => 'required|string',
            'type' => 'required|in:internal,external',
        ];

        // Only require faculty_code for internal faculty
        if ($request->type === 'internal') {
            $validationRules['faculty_code'] = 'required|string|unique:faculty,faculty_code';
        }

        // Additional fields for external faculty
        if ($request->type === 'external') {
            $validationRules['institution'] = 'required|string';
            $validationRules['website_link'] = 'nullable|url';
        }

        $request->validate($validationRules);

        // Check if user already exists
        $existingUser = User::where('email', $request->email)->first();
        
        if ($existingUser) {
            // Check if faculty already exists
            if ($existingUser->faculty) {
                return response()->json([
                    'message' => 'Faculty with this email already exists'
                ], 422);
            }
            $newUser = $existingUser;
            $password = null; // User already exists, no new password
        } else {
            $password = Str::password(8, true, true, true, false);

            $newUser = new \App\Models\User();
            $newUser->first_name = $request->first_name;
            $newUser->last_name = $request->last_name ?: ' ';
            $newUser->phone = $request->phone;
            $newUser->email = $request->email;
            $newUser->password = bcrypt($password);

            $role_id = Role::where('role','faculty')->first()->id;
            $newUser->role_id = $role_id;
            $newUser->current_role_id = $role_id;
            $newUser->default_role_id = $role_id;
            $newUser->save();
        }

        // Generate faculty code for external faculty
        if ($request->type === 'external') {
            $facultyCode = 'EXT' . str_pad($newUser->id, 6, '0', STR_PAD_LEFT);
        } else {
            $facultyCode = $request->faculty_code;
        }

        $faculty = new \App\Models\Faculty();
        $faculty->user_id = $newUser->id;
        $faculty->department_id = $request->department_id;
        $faculty->designation = $request->designation;
        $faculty->faculty_code = $facultyCode;
        $faculty->type = $request->type;
        $faculty->institution = $request->institution ?? 'Thapar Institute of Engineering and Technology';
        $faculty->website_link = $request->website_link;
        $faculty->save();

        return response()->json([
            'message' => 'Faculty added successfully',
            'password' => $password,
            'faculty_code' => $facultyCode
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $user = Auth::user();

        if(!$user->role->can_add_faculties)
        {
            return response()->json([
                'message' => 'You do not have permission to update faculty'
            ], 403);
        }

        $faculty = Faculty::where('faculty_code', $id)->first();
        if (!$faculty) {
            return response()->json([
                'message' => 'Faculty not found'
            ], 404);
        }

        $validationRules = [
            'first_name' => 'required|string',
            'last_name' => 'nullable|string',
            'email' => 'required|email|unique:users,email,' . $faculty->user_id,
            'phone' => 'required|string',
            'department_id' => 'nullable|integer',
            'designation' => 'required|string',
            'type' => 'required|in:internal,external',
        ];

        // Only validate faculty_code for internal faculty
        if ($request->type === 'internal') {
            $validationRules['faculty_code'] = 'required|string|unique:faculty,faculty_code,' . $id . ',faculty_code';
        }

        if ($request->type === 'external') {
            $validationRules['institution'] = 'required|string';
            $validationRules['website_link'] = 'nullable|url';
        }

        $request->validate($validationRules);

        // Update user
        $faculty->user->first_name = $request->first_name;
        $faculty->user->last_name = $request->last_name ?: ' ';
        $faculty->user->email = $request->email;
        $faculty->user->phone = $request->phone;
        $faculty->user->save();

        // Update faculty
        if ($request->type === 'internal') {
            $faculty->faculty_code = $request->faculty_code;
        }
        // External faculty code remains auto-generated, can't be changed

        $faculty->department_id = $request->department_id;
        $faculty->designation = $request->designation;
        $faculty->type = $request->type;
        $faculty->institution = $request->institution ?? 'Thapar Institute of Engineering and Technology';
        $faculty->website_link = $request->website_link;
        $faculty->save();

        return response()->json([
            'message' => 'Faculty updated successfully',
            'faculty_code' => $faculty->faculty_code
        ], 200);
    }

    public function list(Request $request)
    {
        $loggedInUser = Auth::user();
        $role = $loggedInUser->current_role->role;
        $filters = $request->input('filters', []);
        $filtersJson = $request->query('filters');

        if ($filtersJson) {
              $filters = json_decode(urldecode($filtersJson), true);
        }
        $perPage = $request->input('rows', 15);
        $page = $request->input('page', 1);
    
        $facultyQuery = Faculty::with(['user', 'department']);
    
        if ($role === 'hod'||$role === 'phd_coordinator') {
            $facultyQuery->where('department_id', $loggedInUser->faculty->department_id);
        }  elseif ($role === 'admin'||$role === 'director' || $role === 'dra' || $role === 'dordc') {
          
        } else {
            return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }
    
        if ($filters) {
            $facultyQuery = $this->applyDynamicFilters($facultyQuery, $filters);
        }
    
        $faculties = $facultyQuery->paginate($perPage, ['*'], 'page', $page);
    
        $result = $faculties->getCollection()->map(function ($faculty) {
            return [
                'id' => $faculty->faculty_code,
                'faculty_code' => $faculty->faculty_code,
                'first_name' => $faculty->user->first_name,
                'last_name' => $faculty->user->last_name,
                'name' => $faculty->user->name(),
                'designation' => $faculty->designation,
                'email' => $faculty->user->email,
                'phone' => $faculty->user->phone,
                'department' => $faculty->department?->name,
                'department_id' => $faculty->department_id,
                'type' => $faculty->type,
                'institution' => $faculty->institution,
                'website_link' => $faculty->website_link,
                'supervised_students' => $faculty->supervisedStudents?->map(fn ($s) => [
                    'name' => $s->user->name(),
                    'roll_number' => $s->roll_number,
                ]),
                'doctored_students' => $faculty->doctoralCommittee?->map(fn ($s) => [
                    'name' => $s->user->name(),
                    'roll_number' => $s->roll_number,
                ]),
                'supervised_outside'=> $faculty->supervised_outside,
                'supervised_campus'=> $faculty->supervised_campus,
            ];
        });
    
        return response()->json([
            'data' => $result,
            'total' => $faculties->total(),
            'per_page' => $faculties->perPage(),
            'current_page' => $faculties->currentPage(),
            'totalPages' => $faculties->lastPage(),
            'role' => $role,
            'fields' => ['name', 'designation', 'email', 'phone', 'department'],
            'fieldsTitles' => ['Name', 'Designation', 'Email', 'Phone', 'Department'],
        ]);
    }
    

    public function showUploadForm()
    {
        return view('upload-faculty');
    }

    public function upload(Request $request)
    {
        $user = Auth::user();

        if(!$user->role->can_add_faculties)
        {
            return response()->json([
                'message' => 'You do not have permission to upload faculty'
            ], 403);
        }

        $request->validate([
            'file' => 'required|mimes:csv,txt'
        ]);

        $file = $request->file('file');
        $csvData = array_map('str_getcsv', file($file->getRealPath()));
        $header = array_shift($csvData);

        $successCount = 0;
        $updateCount = 0;
        $errorCount = 0;
        $errors = [];

        foreach ($csvData as $index => $row) {
            try {
                if (count($row) < 5) {
                    $errors[] = "Row " . ($index + 2) . ": Insufficient columns";
                    $errorCount++;
                    continue;
                }

                $firstName = trim($row[0]);
                $lastName = trim($row[1]);
                $email = trim($row[2]);
                $phone = trim($row[3]);
                $designation = trim($row[4]);
                $type = isset($row[5]) ? trim($row[5]) : 'internal';
                
                // Validate type
                if (!in_array($type, ['internal', 'external'])) {
                    $errors[] = "Row " . ($index + 2) . ": Invalid type (must be 'internal' or 'external')";
                    $errorCount++;
                    continue;
                }

                // For internal: faculty_code, department_code required
                // For external: institution required, department_code optional
                if ($type === 'internal') {
                    $facultyCode = isset($row[6]) ? trim($row[6]) : null;
                    $departmentCode = isset($row[7]) ? trim($row[7]) : null;
                    $institution = 'Thapar Institute of Engineering and Technology';
                    $websiteLink = isset($row[8]) ? trim($row[8]) : null;

                    if (empty($facultyCode)) {
                        $errors[] = "Row " . ($index + 2) . ": Faculty code required for internal faculty";
                        $errorCount++;
                        continue;
                    }
                    if (empty($departmentCode)) {
                        $errors[] = "Row " . ($index + 2) . ": Department code required for internal faculty";
                        $errorCount++;
                        continue;
                    }
                } else {
                    // External faculty
                    $departmentCode = isset($row[6]) ? trim($row[6]) : null;
                    $institution = isset($row[7]) ? trim($row[7]) : null;
                    $websiteLink = isset($row[8]) ? trim($row[8]) : null;

                    if (empty($institution)) {
                        $errors[] = "Row " . ($index + 2) . ": Institution required for external faculty";
                        $errorCount++;
                        continue;
                    }
                    $facultyCode = null; // Will be auto-generated
                }

                // Validate required fields
                if (empty($firstName) || empty($email) || empty($designation)) {
                    $errors[] = "Row " . ($index + 2) . ": Missing required fields (first_name, email, designation)";
                    $errorCount++;
                    continue;
                }

                // Validate email
                if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                    $errors[] = "Row " . ($index + 2) . ": Invalid email format";
                    $errorCount++;
                    continue;
                }

                // Find or create department
                $department = null;
                if ($departmentCode) {
                    $department = Department::where('code', $departmentCode)->first();
                    if (!$department) {
                        $errors[] = "Row " . ($index + 2) . ": Department code '{$departmentCode}' not found";
                        $errorCount++;
                        continue;
                    }
                }

                // Check if user exists
                $existingUser = User::where('email', $email)->first();
                
                if ($existingUser) {
                    // Check if faculty already exists
                    $existingFaculty = Faculty::where('user_id', $existingUser->id)->first();
                    
                    if ($existingFaculty) {
                        // Update existing faculty
                        $existingUser->first_name = $firstName;
                        $existingUser->last_name = $lastName ?: ' ';
                        $existingUser->phone = $phone;
                        $existingUser->save();

                        if ($type === 'internal' && $facultyCode) {
                            $existingFaculty->faculty_code = $facultyCode;
                        }
                        // External faculty code remains unchanged

                        $existingFaculty->department_id = $department?->id;
                        $existingFaculty->designation = $designation;
                        $existingFaculty->type = $type;
                        $existingFaculty->institution = $institution;
                        $existingFaculty->website_link = $websiteLink;
                        $existingFaculty->save();

                        $updateCount++;
                    } else {
                        // User exists but not faculty - create faculty record
                        if ($type === 'external') {
                            $facultyCode = 'EXT' . str_pad($existingUser->id, 6, '0', STR_PAD_LEFT);
                        }

                        Faculty::create([
                            'user_id' => $existingUser->id,
                            'faculty_code' => $facultyCode,
                            'department_id' => $department?->id,
                            'designation' => $designation,
                            'type' => $type,
                            'institution' => $institution,
                            'website_link' => $websiteLink,
                        ]);

                        $successCount++;
                    }
                } else {
                    // Create new user
                    $password = Str::password(8, true, true, true, false);
                    $role_id = Role::where('role', 'faculty')->first()->id;

                    $newUser = User::create([
                        'first_name' => $firstName,
                        'last_name' => $lastName ?: ' ',
                        'email' => $email,
                        'phone' => $phone,
                        'password' => bcrypt($password),
                        'role_id' => $role_id,
                        'current_role_id' => $role_id,
                        'default_role_id' => $role_id,
                    ]);

                    // Generate faculty code for external
                    if ($type === 'external') {
                        $facultyCode = 'EXT' . str_pad($newUser->id, 6, '0', STR_PAD_LEFT);
                    }

                    Faculty::create([
                        'user_id' => $newUser->id,
                        'faculty_code' => $facultyCode,
                        'department_id' => $department?->id,
                        'designation' => $designation,
                        'type' => $type,
                        'institution' => $institution,
                        'website_link' => $websiteLink,
                    ]);

                    $successCount++;
                }
            } catch (\Exception $e) {
                $errors[] = "Row " . ($index + 2) . ": " . $e->getMessage();
                $errorCount++;
            }
        }

        return response()->json([
            'success' => true,
            'message' => "Import completed: {$successCount} created, {$updateCount} updated, {$errorCount} errors",
            'data' => [
                'success_count' => $successCount,
                'update_count' => $updateCount,
                'error_count' => $errorCount,
                'errors' => $errors,
            ]
        ], 200);
    }
}