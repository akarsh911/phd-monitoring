<?php 
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DepartmentController extends Controller
{

    public function add(Request $request)
    {
        $loggenInUser = Auth::user();
        if($loggenInUser->role->can_add_department == 'false'){
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
        if($loggenInUser->role->can_add_department == 'false'){
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
}