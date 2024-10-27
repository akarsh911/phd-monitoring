<?php

namespace App\Http\Controllers;

use App\Models\BroadAreaSpecialization;
use App\Models\Department;
use App\Models\ExaminersDetail;
use App\Models\Faculty;
use App\Models\OutsideExpert;
use Illuminate\Http\Request;    
use Illuminate\Support\Facades\Auth;


class SuggestionController extends Controller {

    public function suggestSpecialization(Request $request)
    {
        $department=null;
        $loggenInUser = Auth::user();
        if($loggenInUser->role->role == 'student'){
            $department = $loggenInUser->student->department;
        }
        else{
            $department = $loggenInUser->faculty->department;
        }

        $request->validate(
            [
                'text' => 'required|string',
            ]
            );
            if (!$request->has('text') || strlen($request->query('text')) < 3) {
                return response()->json([], 200);
            }
            $specializations = BroadAreaSpecialization::where('department_id', $department->id)
            ->where('broad_area', 'LIKE', '%' . $request->text . '%')
            ->get();
    
        // Return the specializations as a JSON response
        return response()->json($specializations);
      
    }

    public function suggestExaminer(Request $request)
    {
        $loggenInUser = Auth::user();
        if($loggenInUser->role->role!='faculty'){
            return response()->json(["message"=>"Only faculty can view examiners"]);
        }

        $request->validate(
            [
                'text' => 'required|string',
            ]
            );
            if (!$request->has('text') || strlen($request->query('text')) < 3) {
                return response()->json([], 200);
            }
            $examiners = ExaminersDetail::where('name', 'LIKE', '%' . $request->text . '%')
            ->get()
            ->makeHidden('added_by');
        
        // Return the examiners as a JSON response
        return response()->json($examiners);
      
    }

    public function suggestFaculty(Request $request)
    {
        $request->validate([
            'text' => 'required|string',
            'department_id' => 'nullable|integer',
        ]);

        if (!$request->text) {
            return response()->json([], 200);
        }

        $facultyQuery = Faculty::with([]) // Include related user and department
            ->whereHas('user', function ($query) use ($request) {
                $query->where('first_name', 'LIKE', '%' . $request->text . '%')
                    ->orWhere('last_name', 'LIKE', '%' . $request->text . '%');
            });
    
        if (!empty($request->department_id)) {
            $department = Department::find($request->department_id);
            if(!$department){
                return response()->json(['message' => 'Department not found'], 404);
            }
            $facultyQuery->where('department_id', $request->query('department_id'));
        }
    
        $faculty = $facultyQuery->get()->map(function ($faculty) {
            return [
                'id' => $faculty->faculty_code,
                'name' => $faculty->user->name(),
                'email' => $faculty->user->email,
                'designation' => $faculty->designation,
                'department' => $faculty->department->name ?? 'N/A',
            ];
        });
    
        return response()->json($faculty);
    }
    
    public function suggestOutsideExpert(Request $request)
    {
        $request->validate([
            'text' => 'required|string',
        ]);
    
        if (!$request->has('text') ) {
            return response()->json([], 200);
        }
    
       $outsideExperts= OutsideExpert::where('first_name', 'LIKE', '%' . $request->text . '%')
            ->orWhere('last_name', 'LIKE', '%' . $request->text . '%')
            ->orWhere('designation', 'LIKE', '%' . $request->text . '%')
            ->orWhere('email', 'LIKE', '%' . $request->text . '%')
            ->orWhere('phone', 'LIKE', '%' . $request->text. '%')
            ->get();
    
        return response()->json($outsideExperts);
    }

    public function suggestInstitute(Request $request)
    {
        $request->validate([
            'text' => 'required|string',
        ]);
    
        if (!$request->has('text') || strlen($request->text) < 3) {
            return response()->json([], 200);
        }
    
        $institutes = OutsideExpert::where('institution', 'LIKE', '%' . $request->text . '%')
            ->get();
    
        return response()->json($institutes);
    }
    

}
