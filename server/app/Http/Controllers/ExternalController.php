<?php
namespace App\Http\Controllers;

use App\Models\OutsideExpert;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use function PHPSTORM_META\map;

class ExternalController extends Controller
{
    public function list(Request $request)
    {
        try{
        $user= Auth::user();
        if($user->role->can_read_external == 'true'){
            $external = OutsideExpert::all();
            return response()->json(
                [
                    'externals'=>$external
                ],200
            );
        }
        else{
            return response()->json(
                [
                    'message'=>'You are not authorized to view this page'
                ],403
            );
        }
    }catch (\Illuminate\Validation\ValidationException $e) {
        return response()->json(['errors' => $e->errors()], 422);
    }

    }
    public function add(Request $request)
    {
        try{
            $request->validate([
                'first_name' => 'required|string',
                'last_name' => 'required|string',
                'designation' => 'required|string',
                'institution' => 'required|string',
                'email' => 'required|email',
                'phone' => 'required|string',
            ]);
        $user= Auth::user();
        if($user->role->can_edit_external == 'true'){

            if(OutsideExpert::where('email',$request->email)->exists()){
                OutsideExpert::where('email',$request->email)->update([
                    'first_name' => $request->first_name,
                    'last_name' => $request->last_name,
                    'phone' => $request->phone,
                    'designation' => $request->designation,
                    'department' => $request->department,
                    'institution' => $request->institution,
                ]);
                $external = OutsideExpert::where('email',$request->email)->first();
                return response()->json(
                    [
                        'external'=>$external,
                        'mode'=>'updated'
                    ],200
                );
            }
            $external = new OutsideExpert();
            $external->first_name = $request->first_name;
            $external->last_name = $request->last_name;
            $external->phone = $request->phone;
            $external->email = $request->email;
            $external->designation = $request->designation;
            $external->department = $request->department;
            $external->institution = $request->institution;
            $external->save();
            return response()->json(
                [
                    'external'=>$external,
                    'mode'=>'added'
                ],200
            );
        }
    }
    catch (\Illuminate\Validation\ValidationException $e) {
        return response()->json(['errors' => $e->errors()], 422);
    }
    }
    public function autoComplete(Request $request)
    {
        $request->validate([
            'search' => 'required|string',
        ]);
        try{
        $user= Auth::user();
        if($user->role->can_read_external == 'true'){
            $external = OutsideExpert::where('first_name','like','%'.$request->search.'%')
            ->orWhere('last_name','like','%'.$request->search.'%')
            ->orWhere('email','like','%'.$request->search.'%')
            ->orWhere('phone','like','%'.$request->search.'%')
            ->orWhere('institution','like','%'.$request->search.'%')
            ->get();
            return response()->json(
                [
                    'externals'=>$external
                ],200
            );
        }
    }
    catch (\Illuminate\Validation\ValidationException $e) {
        return response()->json(['errors' => $e->errors()], 422);
    }
    }
    public function autoCompleteInstitution(Request $request)
    {
        try{
            $request->validate([
                'search' => 'required|string',
            ]);
            $user= Auth::user();
            if($user->role->can_read_external == 'true'){
                $external = OutsideExpert::where('institution','like','%'.$request->search.'%')->get();
                $external = $external->map(function($item){
                    return $item->institution;
                });
                return response()->json(
                    [
                        'institutions'=>$external
                    ],200
                );
            }
        }
        catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }

    }
}
