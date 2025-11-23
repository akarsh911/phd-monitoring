<?php 
namespace App\Http\Controllers;

use App\Http\Controllers\Traits\FilterLogicTrait;
use App\Models\Department;
use App\Models\Faculty;
use App\Models\PhdCoordinator;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DepartmentController extends Controller
{
    use FilterLogicTrait;
    
    public function listFilters(Request $request){
        return response()->json($this->getAvailableFilters("departments"));
    }

    public function listAreaFilters(Request $request){
        return response()->json($this->getAvailableFilters("area_of_specialization"));
    }


    public function list(Request $request)
    {
        $loggedInUser = Auth::user();
        $role = $loggedInUser->current_role->role;
        $filtersJson = $request->query('filters');
        $filters = $filtersJson ? json_decode(urldecode($filtersJson), true) : $request->input('filters', []);
    
        $perPage = $request->input('rows', 15);
        $page = $request->input('page', 1);
    
        if (!in_array($role, ['admin', 'director', 'dra', 'dordc'])) {
            return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }
    
        $facultyQuery = Department::with(['hod.user', 'phdCoordinators.faculty.user']);
    
        if ($filters) {
            $facultyQuery = $this->applyDynamicFilters($facultyQuery, $filters);
        }
    
        $faculties = $facultyQuery->paginate($perPage, ['*'], 'page', $page);
    
        $result = $faculties->getCollection()->map(function ($department) {
            return [
                'id' => $department->id,
                'name' => $department->name,
                'hod' => [
                    'name' => optional($department?->hod?->user)->name(),
                    'email' => optional($department?->hod?->user)->email,
                    'phone' => optional($department?->hod?->user)->phone,
                ],
                'phd_coordinators' => $department->phdCoordinators->map(function ($coordinator) {
                    return [
                        'name' => optional($coordinator?->faculty?->user)->name(),
                        'email' => optional($coordinator?->faculty?->user)->email,
                        'phone' => optional($coordinator?->faculty?->user)->phone,
                    ];
                }),
                'students_count' => $department->students()->count(),
            ];
        });
    
        return response()->json([
            'data' => $result,
            'total' => $faculties->total(),
            'per_page' => $faculties->perPage(),
            'current_page' => $faculties->currentPage(),
            'totalPages' => $faculties->lastPage(),
            'role' => $role,
            'fields' => ['name', 'hod.name', 'email', 'phone', 'department'],
            'fieldsTitles' => ['Name', 'HOD Name', 'Email', 'Phone', 'Department'],
        ]);
    }
    
    

    public function add(Request $request)
    {
        $loggenInUser = Auth::user();
        if($loggenInUser->current_role->can_add_department == 'false'){
            return response()->json([
                'message' => 'You do not have permission to create department'
            ], 403);
        }

        $request->validate(
            [
                'name' => 'required|string',
                'code' => 'required|string',
            ]
        );
        $department = new \App\Models\Department();
        $department->name = $request->name;
        $department->code = $request->code;
        $department->save();
        return response()->json([
            'message' => 'Department added successfully'
        ], 200);
    }

    public function addBroadAreaSpecialization(Request $request)
    {
        try{

        $loggenInUser = Auth::user();
        if($loggenInUser->current_role->can_add_department == 'false'){
            return response()->json([
                'message' => 'You do not have permission to create department'
            ], 403);
        }

        $request->validate(
            [
                'broad_area' => 'required|string',
                'department_id' => 'required|integer',

            ]
        );
        $department = \App\Models\Department::find($request->department_id);
        if(!$department){
            return response()->json([
                'message' => 'Department not found'
            ], 404);
        }
        $broadAreaSpecialization = new \App\Models\BroadAreaSpecialization();
        $broadAreaSpecialization->broad_area = $request->broad_area;
        $broadAreaSpecialization->department_id = $request->department_id;
        $broadAreaSpecialization->save();
        return response()->json([
            'message' => 'Broad area specialization added successfully'
        ], 200);
      }
        catch(\Exception $e){
            return response()->json([
                'message' => 'An error occured'
            ], 500);
        }
    }

    public function addAreaOfSpecialization(Request $request)
    {
        try {
            $loggedInUser = Auth::user();
            if($loggedInUser->current_role->can_add_department == 'false'){
                return response()->json([
                    'message' => 'You do not have permission to add area of specialization'
                ], 403);
            }

            $request->validate([
                'name' => 'required|string',
                'department_id' => 'required|integer',
                'expert_name' => 'nullable|string',
                'expert_email' => 'nullable|email',
                'expert_phone' => 'nullable|string',
                'expert_college' => 'nullable|string',
                'expert_designation' => 'nullable|string',
                'expert_website' => 'nullable|string',
            ]);

            $department = \App\Models\Department::find($request->department_id);
            if(!$department){
                return response()->json([
                    'message' => 'Department not found'
                ], 404);
            }

            $areaOfSpecialization = new \App\Models\AreaOfSpecialization();
            $areaOfSpecialization->name = $request->name;
            $areaOfSpecialization->department_id = $request->department_id;
            $areaOfSpecialization->expert_name = $request->expert_name;
            $areaOfSpecialization->expert_email = $request->expert_email;
            $areaOfSpecialization->expert_phone = $request->expert_phone;
            $areaOfSpecialization->expert_college = $request->expert_college;
            $areaOfSpecialization->expert_designation = $request->expert_designation;
            $areaOfSpecialization->expert_website = $request->expert_website;
            $areaOfSpecialization->save();

            return response()->json([
                'success' => true,
                'message' => 'Area of specialization added successfully',
                'data' => $areaOfSpecialization
            ], 200);
        } catch(\Exception $e) {
            return response()->json([
                'message' => 'An error occurred: ' . $e->getMessage()
            ], 500);
        }
    }

    public function getAreasOfSpecialization(Request $request)
    {
        try {
            $departmentId = $request->query('department_id');
            
            if (!$departmentId) {
                return response()->json([
                    'message' => 'Department ID is required'
                ], 400);
            }

            $areas = \App\Models\AreaOfSpecialization::where('department_id', $departmentId)
                ->orderBy('name')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $areas
            ], 200);
        } catch(\Exception $e) {
            return response()->json([
                'message' => 'An error occurred: ' . $e->getMessage()
            ], 500);
        }
    }

    public function listAreasOfSpecialization(Request $request)
    {
        try {
            $loggedInUser = Auth::user();
            $role = $loggedInUser->current_role->role;
            
            $filtersJson = $request->query('filters');
            $filters = $filtersJson ? json_decode(urldecode($filtersJson), true) : $request->input('filters', []);
            
            $perPage = $request->input('rows', 15);
            $page = $request->input('page', 1);

            $query = \App\Models\AreaOfSpecialization::with('department');

            // Apply role-based filtering
            if ($role === 'hod') {
                $facultyCode = $loggedInUser->faculty->faculty_code;
                $hodDepartment = Department::where('hod_id', $facultyCode)->first();
                if ($hodDepartment) {
                    $query->where('department_id', $hodDepartment->id);
                }
            } elseif ($role === 'phd_coordinator') {
                $facultyCode = $loggedInUser->faculty->faculty_code;
                $coordinator = \App\Models\PhdCoordinator::where('faculty_id', $facultyCode)->first();
                if ($coordinator) {
                    $query->where('department_id', $coordinator->department_id);
                }
            }

            // Apply dynamic filters
            if ($filters) {
                $query = $this->applyDynamicFilters($query, $filters);
            }

            $areas = $query->paginate($perPage, ['*'], 'page', $page);

            $result = $areas->getCollection()->map(function ($area) {
                return [
                    'id' => $area->id,
                    'name' => $area->name,
                    'department_id' => $area->department_id,
                    'department_name' => $area->department->name ?? 'N/A',
                    'expert_name' => $area->expert_name,
                    'expert_email' => $area->expert_email,
                    'expert_phone' => $area->expert_phone,
                    'expert_college' => $area->expert_college,
                    'created_at' => $area->created_at,
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $result,
                'total' => $areas->total(),
                'per_page' => $areas->perPage(),
                'current_page' => $areas->currentPage(),
                'totalPages' => $areas->lastPage(),
                'role' => $role,
                'fields' => ['name', 'department_name', 'expert_name', 'expert_email', 'expert_phone'],
                'fieldsTitles' => ['Area Name', 'Department', 'Expert Name', 'Expert Email', 'Expert Phone'],
            ], 200);
        } catch(\Exception $e) {
            return response()->json([
                'message' => 'An error occurred: ' . $e->getMessage()
            ], 500);
        }
    }

    public function updateAreaOfSpecialization(Request $request, $id)
    {
        try {
            $loggedInUser = Auth::user();
            
            $request->validate([
                'name' => 'required|string',
                'department_id' => 'required|integer',
                'expert_name' => 'nullable|string',
                'expert_email' => 'nullable|email',
                'expert_phone' => 'nullable|string',
                'expert_college' => 'nullable|string',
            ]);

            $area = \App\Models\AreaOfSpecialization::find($id);
            if (!$area) {
                return response()->json([
                    'message' => 'Area of specialization not found'
                ], 404);
            }

            // Check authorization
            $role = $loggedInUser->current_role->role;
            if ($role === 'hod' || $role === 'phd_coordinator') {
                $facultyCode = $loggedInUser->faculty->faculty_code;
                $allowedDepartmentId = null;
                
                if ($role === 'hod') {
                    $hodDepartment = Department::where('hod_id', $facultyCode)->first();
                    $allowedDepartmentId = $hodDepartment->id ?? null;
                } else {
                    $coordinator = \App\Models\PhdCoordinator::where('faculty_id', $facultyCode)->first();
                    $allowedDepartmentId = $coordinator->department_id ?? null;
                }

                if ($area->department_id !== $allowedDepartmentId) {
                    return response()->json([
                        'message' => 'You do not have permission to update this area'
                    ], 403);
                }
            }

            $area->name = $request->name;
            $area->department_id = $request->department_id;
            $area->expert_name = $request->expert_name;
            $area->expert_email = $request->expert_email;
            $area->expert_phone = $request->expert_phone;
            $area->expert_college = $request->expert_college;
            $area->save();

            return response()->json([
                'success' => true,
                'message' => 'Area of specialization updated successfully',
                'data' => $area
            ], 200);
        } catch(\Exception $e) {
            return response()->json([
                'message' => 'An error occurred: ' . $e->getMessage()
            ], 500);
        }
    }

    public function deleteAreaOfSpecialization(Request $request, $id)
    {
        try {
            $loggedInUser = Auth::user();
            $area = \App\Models\AreaOfSpecialization::find($id);
            
            if (!$area) {
                return response()->json([
                    'message' => 'Area of specialization not found'
                ], 404);
            }

            // Check authorization
            $role = $loggedInUser->current_role->role;
            if ($role === 'hod' || $role === 'phd_coordinator') {
                $facultyCode = $loggedInUser->faculty->faculty_code;
                $allowedDepartmentId = null;
                
                if ($role === 'hod') {
                    $hodDepartment = Department::where('hod_id', $facultyCode)->first();
                    $allowedDepartmentId = $hodDepartment->id ?? null;
                } else {
                    $coordinator = \App\Models\PhdCoordinator::where('faculty_id', $facultyCode)->first();
                    $allowedDepartmentId = $coordinator->department_id ?? null;
                }

                if ($area->department_id !== $allowedDepartmentId) {
                    return response()->json([
                        'message' => 'You do not have permission to delete this area'
                    ], 403);
                }
            }

            $area->delete();

            return response()->json([
                'success' => true,
                'message' => 'Area of specialization deleted successfully'
            ], 200);
        } catch(\Exception $e) {
            return response()->json([
                'message' => 'An error occurred: ' . $e->getMessage()
            ], 500);
        }
    }

    public function importAreasFromCSV(Request $request)
    {
        try {
            $loggedInUser = Auth::user();
            
            $request->validate([
                'csv_file' => 'required|file|mimes:csv,txt|max:2048',
            ]);

            $file = $request->file('csv_file');
            $path = $file->getRealPath();
            $data = array_map('str_getcsv', file($path));
            $header = array_shift($data);

            $importedCount = 0;
            $errors = [];

            foreach ($data as $index => $row) {
                try {
                    if (count($row) < 2) continue;

                    $rowData = array_combine($header, $row);
                    
                    // Check authorization for department
                    $departmentId = $rowData['department_id'] ?? null;
                    $role = $loggedInUser->current_role->role;
                    
                    if ($role === 'hod' || $role === 'phd_coordinator') {
                        $facultyCode = $loggedInUser->faculty->faculty_code;
                        $allowedDepartmentId = null;
                        
                        if ($role === 'hod') {
                            $hodDepartment = Department::where('hod_id', $facultyCode)->first();
                            $allowedDepartmentId = $hodDepartment->id ?? null;
                        } else {
                            $coordinator = \App\Models\PhdCoordinator::where('faculty_id', $facultyCode)->first();
                            $allowedDepartmentId = $coordinator->department_id ?? null;
                        }

                        if ($departmentId != $allowedDepartmentId) {
                            $errors[] = "Row " . ($index + 2) . ": Not authorized for this department";
                            continue;
                        }
                    }

                    $area = new \App\Models\AreaOfSpecialization();
                    $area->name = $rowData['name'] ?? '';
                    $area->department_id = $departmentId;
                    $area->expert_name = $rowData['expert_name'] ?? null;
                    $area->expert_email = $rowData['expert_email'] ?? null;
                    $area->expert_phone = $rowData['expert_phone'] ?? null;
                    $area->expert_college = $rowData['expert_college'] ?? null;
                    $area->save();

                    $importedCount++;
                } catch (\Exception $e) {
                    $errors[] = "Row " . ($index + 2) . ": " . $e->getMessage();
                }
            }

            return response()->json([
                'success' => true,
                'message' => "Imported {$importedCount} areas successfully",
                'imported_count' => $importedCount,
                'errors' => $errors,
            ], 200);
        } catch(\Exception $e) {
            return response()->json([
                'message' => 'An error occurred: ' . $e->getMessage()
            ], 500);
        }
    }

    public function addHOD(Request $request)
    {
        try{
        $loggenInUser = Auth::user();
        if($loggenInUser->current_role->can_add_department == 'false'){
            return response()->json([
                'message' => 'You do not have permission to create department'
            ], 403);
        }

        $request->validate(
            [
                'department_id' => 'required|integer',
                'faculty_code' => 'required|integer',
            ]
        );
        $department = \App\Models\Department::find($request->department_id);
        if(!$department){
            return response()->json([
                'message' => 'Department not found'
            ], 404);
        }
        $faculty = Faculty::where('faculty_code', $request->faculty_code)->first();
        if(!$faculty){
            return response()->json([
                'message' => 'Faculty not found'
            ], 404);
        }
        if($faculty->department_id != $request->department_id){
            return response()->json([
                'message' => 'Faculty does not belong to this department'
            ], 400);
        }

        $user=$faculty->user;
        $user->role_id=Role::where('name', 'hod')->first()->id;
        $user->save();
        $department->hod_id = $request->user_id;
        $department->save();
        return response()->json([
            'message' => 'HOD added successfully'
        ], 200);
      }
        catch(\Exception $e){
            return response()->json([
                'message' => 'An error occured'
            ], 500);
        }
    }

    public function addCoordinator(Request $request)
    {
        try{
        $loggenInUser = Auth::user();
        if($loggenInUser->current_role->can_add_department == 'false'){
            return response()->json([
                'message' => 'You do not have permission to create department'
            ], 403);
        }

        $request->validate(
            [
                'department_id' => 'required|integer',
                'faculty_code' => 'required|integer',
            ]
        );
        $department = \App\Models\Department::find($request->department_id);
        if(!$department){
            return response()->json([
                'message' => 'Department not found'
            ], 404);
        }
        $faculty = Faculty::where('faculty_code', $request->faculty_code)->first();
        if(!$faculty){
            return response()->json([
                'message' => 'Faculty not found'
            ], 404);
        }
        if($faculty->department_id != $request->department_id){
            return response()->json([
                'message' => 'Faculty does not belong to this department'
            ], 400);
        }
        $user=$faculty->user;
        $user->role_id=Role::where('name', 'phd_coordinator')->first()->id;
        $user->save();
        PhdCoordinator::create([
            'department_id' => $request->department_id,
            'faculty_id' => $request->faculty_code
        ]);

        return response()->json([
            'message' => 'Coordinator added successfully'
        ], 200);
      }
        catch(\Exception $e){
            return response()->json([
                'message' => 'An error occured'.$e->getMessage()
            ], 500);
        }
    }
}