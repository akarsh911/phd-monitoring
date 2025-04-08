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