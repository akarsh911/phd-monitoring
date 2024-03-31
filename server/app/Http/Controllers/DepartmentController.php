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
}