<?php

namespace App\Http\Controllers;

use App\Models\BroadAreaSpecialization;
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
}
