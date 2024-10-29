<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Traits\GeneralFormHandler;
use App\Http\Controllers\Traits\GeneralFormList;
use App\Http\Controllers\Traits\GeneralFormSubmitter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Traits\SaveFile;
use App\Models\Patent;
use App\Models\Publication;
use App\Models\ThesisSubmission;


class UserController extends Controller{
    public function list(Request $request){
        $user = Auth::user();
        return response()->json($user);
    }

    public function listForms(Request $request, $roll_no = null){
        $user = Auth::user();
        $role = $user->role;
        $data = null;
        switch ($role->role) {
            case 'student':
                $data = $user->student->forms();
                break;
            case 'hod':
            case 'phd_coordinator':
            case 'dra':
            case 'dordc':
            case 'director':
            case 'faculty':
                $data = $user->faculty->forms($roll_no);
                break;
            default:
                return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }
        return response()->json($data, 200);
    }


}