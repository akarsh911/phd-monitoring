<?php 
namespace App\Http\Controllers;

use App\Models\Faculty;
use App\Models\PhdCoordinator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DepartmentController extends Controller
{

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
        // $user=$faculty->user;
        // $user->current_role_id=2;
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
        if(PhdCoordinator::where('department_id', $request->department_id)->where('faculty_id', $request->faculty_code)->exists()){
            return response()->json([
                'message' => 'Coordinator already exists'
            ], 400);
        }
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