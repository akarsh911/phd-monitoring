<?php

namespace App\Http\Controllers;

use App\Models\BroadAreaSpecialization;
use App\Models\ExaminersDetail;
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
        
            $examiners = ExaminersDetail::where('name', 'LIKE', '%' . $request->text . '%')
            ->get()
            ->makeHidden('added_by');
        
        // Return the examiners as a JSON response
        return response()->json($examiners);
      
    }
}
