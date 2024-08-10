<?php

namespace App\Http\Controllers;

use App\Models\Presentation;
use App\Models\PresentationReview;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\Faculty;
use App\Models\IrbForm;
use App\Models\IrbFormHistory;
use App\Models\IrbNomineeCognate;
use App\Models\IrbOutsideExpert;
use App\Models\IrbSupervisorApproval;
use App\Models\OutsideExpert;
use App\Models\Student;


class PresentationController extends Controller{
    
    public function load(Request $request)
    {
        $user = Auth::user();
        $role = $user->role;
        // Log the role in console

        switch ($role->role) {
            case 'student':
                return $this->handleStudentForm($user);
                break;
            case 'hod':
            case 'dra':
            case 'dordc':
            case 'faculty':
                return $this->handleFacultyForm($user, $request);
                break;
            default:
                return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }
    }

    private function handleStudentForm($user)
    {
       try{
            $student=$user->student;
            if(!$student){
                return response()->json(['message' => 'Student not found'], 404);
            }
            $presentation = Presentation::where('student_id', $student->roll_no)->latest()->first();
            if(!$presentation||$presentation->status=='evaluated'){
                $presentation=new Presentation([
                    'student_id'=>$student->roll_no,
                    'locked'=>'no',
                    'supervisor_lock'=>true,
                    'hod_lock'=>true,
                    'dordc_lock'=>true,
                    'dra_lock'=>true,
                    'student_lock'=>false
                ]);
                $presentation->save();
                $supervisors=$student->supervisors;
                $doc_committee=$student->doctoral_committee;
                foreach($supervisors as $supervisor){
                   
                    $review=new PresentationReview([
                        'presentation_id'=>$presentation->id,
                        'faculty_id'=>$supervisor->faculty_code,
                        'is_supervisor'=>'yes',
                        'review_status'=>'pending'
                    ]);
                    $review->save();
                }
                if($doc_committee->count()>0){
                    foreach($doc_committee as $member){
                        $review=new PresentationReview([
                            'presentation_id'=>$presentation->id,
                            'faculty_id'=>$member->faculty_code,
                            'is_supervisor'=>'no',
                            'review_status'=>'pending'
                        ]);
                        $review->save();
                    }
                }
               
            }
                return response()->json($presentation->fullData($user), 200);
            
       }
       catch(\Exception $e){
            echo $e;
           return response()->json(['message' => 'An error occurred while processing your request'], 500);
       }
    }
    private function handleFacultyForm($user, $request)
    {
        try{
            $request->validate(['student_id' => 'required|integer']);
            $student = Student::where('roll_no', $request->student_id)->first();
            if(!$student){
                return response()->json(['message' => 'Student not found'], 404);
            }
            if ($student->department->id==$user->faculty->department_id||$student->checkSupervises($user->faculty->faculty_code||$student->checkDoctoralCommittee($user->faculty->faculty_code))) {
                $presentation = Presentation::where('student_id', $student->roll_no)->latest()->first();
                if(!$presentation){
                    return response()->json(['message' => 'Presentation not found'], 404);
                }
                else{
                    return response()->json($presentation->fullData($user), 200);
                }
            }
            else{
                return response()->json(['message' => 'You are not authorized to access this resource'], 403);
               
            }
        }
        catch(\Exception $e){
            echo $e;
            return response()->json(['message' => 'An error occurred while processing your request','err'=>$e], 500);
        }
    }

    public function submit(Request $request)
    {
        $user = Auth::user();
        $role = $user->role;
        switch ($role->role) {
            case 'student':
                return $this->handleStudentSubmit($user, $request);
                break;
            case 'hod':
            case 'dra':
            case 'dordc':
                return $this->handleAdminSubmit($user, $request);
                break;
            case 'faculty':
                return $this->handleFacultySubmit($user, $request);
                break;
            default:
                return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }
    }

    public function update(Request $request)
    {
        $user = Auth::user();
        $role = $user->role;
        switch ($role->role) {
            // case 'student':
            //     return $this->handleStudentUpdate($user, $request);
            //     break;
            case 'faculty':
                return $this->handleFacultyUpdate($user, $request);
                break;
            default:
                return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }
    }
    private function handleStudentSubmit($user, $request)
    {
        try{
            $student = $user->student;
            if(!$student){
                return response()->json(['message' => 'Student not found'], 404);
            }
            $presentation = Presentation::where('student_id', $student->roll_no)->latest()->first();
           
            if(!$presentation){
                return response()->json(['message' => 'Presentation not found'], 404);
            }
            $request->validate([
                'period_of_report' => 'required|string',
                'teaching_work' => 'required|string',
            ]);
            if($presentation->student_lock){
                return response()->json(['message' => 'You have already submitted the presentation'], 403);
            }
            $presentation->period_of_report = $request->period_of_report;
            $presentation->teaching_work = $request->teaching_work;
            $presentation->status = 'under review';
            $presentation->student_lock = true;
            $presentation->supervisor_lock=false;
            $presentation->save();
            return response()->json(['message' => 'Presentation submitted successfully'], 200);
        }
        catch(\Exception $e){
            echo $e;
            return response()->json(['message' => 'An error occurred while processing your request'], 500);
        }
    }

    public function handleFacultySubmit($user,Request $request)
    {
        try{
            $request->validate([
                'student_id' => 'required|integer',
                'progress' => 'required|string',
            ]);
            $student = Student::where('roll_no', $request->student_id)->first();
            if(!$student){
                return response()->json(['message' => 'Student not found'], 404);
            }

            $faculty = Auth::user()->faculty;
            if ($student->checkSupervises($faculty->faculty_code)) {
                $presentation = Presentation::where('student_id', $student->roll_no)->latest()->first();
                if(!$presentation){
                    return response()->json(['message' => 'Presentation not found'], 404);
                }
                if($presentation->supervisor_lock){
                    return response()->json(['message' => 'You have already submitted the review'], 403);
                }
                $SupervisorReviews = PresentationReview::where('presentation_id', $presentation->id)->where('is_supervisor', 'yes')->get();
                foreach($SupervisorReviews as $review){
                    if($review->review_status=='pending' || $review->progress=='not satisfactory'){
                      return response()->json(['message' => 'You have pending reviews from other Supervisors'], 403);
                    }
                }
                if($request->percent)
                {
                    $presentation->progress = $request->percent;
                    $presentation->supervisor_lock=true;
                    $presentation->hod_lock=false;
                    $presentation->save();
                    return response()->json(['message' => 'Progress percentage updated successfully'], 200);
                }
                else{
                    return response()->json(['message' => 'Progress percentage is required'], 400);
                }
                
            }
            else{
                if($student->checkDoctoralCommittee($faculty->faculty_code)){
                    $presentation = Presentation::where('student_id', $student->student_id)->latest()->first();
                    if(!$presentation){
                        return response()->json(['message' => 'Presentation not found'], 404);
                    }
                   $doc_committee_reviews = PresentationReview::where('presentation_id', $presentation->id)->where('is_supervisor', 'no')->get();
                     foreach($doc_committee_reviews as $review){
                          if($review->review_status=='pending' || $review->progress=='not satisfactory'){
                             return response()->json(['message' => 'You have pending reviews from other Doctoral Committee Members'], 403);
                          }
                     }
                    return response()->json(['message' => 'Review submitted successfully'], 200);
                }
                else{
                    return response()->json(['message' => 'You are not authorized to access this resource'], 403);
                }
            }
        }
         catch(\Exception $e){
            echo $e;
            return response()->json(['message' => 'An error occurred while processing your request'], 500);
        }
    }



    private function handleAdminSubmit($user,$request)
    {
        try{
            $request->validate([
                'student_id' => 'required|integer',
                'progress' => 'required|string',
            ]);
            $student = Student::where('roll_no', $request->student_id)->first();
            if(!$student){
                return response()->json(['message' => 'Student not found'], 404);
            }
            $role=$user->role->role;
            $presentation = Presentation::where('student_id', $student->roll_no)->latest()->first();
            if(!$presentation){
                return response()->json(['message' => 'Presentation not found'], 404);
            }
            switch($role)
            {
                case 'hod':
                    if($student->department->id==$user->faculty->department_id){
                        $presentation->progress = $request->progress;
                        $presentation->hod_lock=true;
                        $presentation->dordc_lock=false;
                        $presentation->save();
                        return response()->json(['message' => 'Review submitted successfully'], 200);
                    }
                    else{
                        return response()->json(['message' => 'You are not authorized to access this resource'], 403);
                    }
                    break;
                case 'dordc':
                  
                        $presentation->progress = $request->progress;
                        $presentation->dordc_lock=true;
                        $presentation->dra_lock=false;
                        $presentation->save();
                        return response()->json(['message' => 'Review submitted successfully'], 200);
                   
                    break;
                case 'dra':
                    
                        $presentation->progress = $request->progress;
                        $presentation->dra_lock=true;
                        $presentation->save();
                        return response()->json(['message' => 'Review submitted successfully'], 200);
                  
                    break;
                default:
                    return response()->json(['message' => 'You are not authorized to access this resource'], 403);
            }
        }
        catch(\Exception $e){
            return response()->json(['message' => 'An error occurred while processing your request'], 500);
        }
    }



    private function handleFacultyUpdate($user, $request)
    {
        try{
            $request->validate([
                'student_id' => 'required|integer',
                'progress' => 'required|string',
            ]);
            $student = Student::where('roll_no', $request->student_id)->first();
            if(!$student){
                return response()->json(['message' => 'Student not found'], 404);
            }
            if ($student->checkSupervises($user->faculty->faculty_code)) {
                $is_supervisor='Yes';
                $presentation = Presentation::where('student_id', $student->roll_no)->latest()->first();
                if(!$presentation){
                    return response()->json(['message' => 'Presentation not found'], 404);
                }
                
                $review = PresentationReview::where('presentation_id', $presentation->id)->where('faculty_id', $user->faculty->faculty_code)->first();
                $review->presentation_id = $presentation->id;
                $review->faculty_id = $user->faculty->faculty_code;
                $review->progress = $request->progress;
                $review->comments = $request->comments;
                $review->review_status = 'completed';
                $review->is_supervisor = $is_supervisor;
                $review->save();
                return response()->json(['message' => 'Review submitted successfully'], 200);
            }
            else{
                return response()->json(['message' => 'You are not authorized to access this resource'], 403);
            }
        }
        catch(\Exception $e){
            echo $e;
            return response()->json(['message' => 'An error occurred while processing your request'], 500);
        }
    }
}
