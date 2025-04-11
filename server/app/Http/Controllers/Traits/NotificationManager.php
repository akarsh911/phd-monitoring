<?php
namespace App\Http\Controllers\Traits;

use App\Models\Faculty;
use App\Models\Notifications;
use App\Models\Role;

trait NotificationManager
{
    public function sendNotification($user, $title, $body, $link, $role_id = null, $email_req = false)
    {
        if(!$role_id){
            $role_id=$user->role_id;
        }
        $notification = new Notifications();
        $notification->user_id = $user->id;
        $notification->title = $title;
        $notification->body = $body;
        $notification->link = $link;
        $notification->role_id = $role_id;
        $notification->email_req = $email_req;
        $notification->save();
    }

    public function formNotification($student, $title, $body, $link, $role, $email_req = false)
    {
        
        switch ($role) {
            case 'faculty':
                $this->sendSupervisorNotification($student, $title, $body, $link, $email_req);
                break;
            case 'doctoral':
            case 'external':
                $this->sendDoctoralNotification($student, $title, $body, $link, $email_req);
                    break;
            case 'phd_coordinator':
                $this->phdCoordinatorNotification($student, $title, $body, $link, $email_req);
                break;

            case 'hod':
                $this->sendHodNotification($student, $title, $body, $link, $email_req);
                break;

            case 'dordc':
              
                break;

            case 'dra':
              
                break;
            case 'external':
             
                break;

            case 'director':
              
                break;

            default:
                break;
         }
         $this->sendStudentNotification($student, $title, "Your Form has moved to ".$role .", ". $body, $link, $email_req);
    }
    private function sendStudentNotification($student,$title,$body,$link,$email_req=false){
        $user=$student->user;
        $this->sendNotification($user,$title,$body,$link,null,$email_req);
    }

    private function sendSupervisorNotification($student,$title,$body,$link,$email_req=false){
        $supervisors=$student->supervisors;
        $role_id=Role::where('role','faculty')->first()->id;
        foreach ($supervisors as $supervisor) {
            $faculty=Faculty::where('faculty_code',$supervisor->faculty_code)->first();
            $user=$faculty->user;
            $this->sendNotification($user,$title,$body,$link,$role_id,$email_req);
        }
    }
    private function sendDoctoralNotification($student,$title,$body,$link,$email_req=false){
        $doctoral=$student->doctoralCommittee;
        $role_id=Role::where('role','doctoral')->first()->id;
        foreach ($doctoral as $doctoral) {
            $faculty=Faculty::where('faculty_code',$doctoral->faculty_code)->first();
            $user=$faculty->user;
            $this->sendNotification($user,$title,$body,$link,$role_id,$email_req);
        }
    }
    private function sendHodNotification($student,$title,$body,$link,$email_req=false){
        $hod=$student->department->hod;
        $user=$hod->user;
        $this->sendNotification($user,$title,$body,$link,null,$email_req);
    }
    private function phdCoordinatorNotification($student,$title,$body,$link,$email_req=false){
        $phdCoordinator=$student->department->phdCoordinators;
      
        foreach ($phdCoordinator as $phdCoordinator) {
            $faculty=Faculty::where('faculty_code',$phdCoordinator->faculty_id)->first();
            $user= $faculty->user;
            $this->sendNotification($user,$title,$body,$link,null,$email_req);
        }
    }
    
    private function sendDordcNotification($student,$title,$body,$link,$email_req=false){
       
    }
    private function sendDraNotification($student,$title,$body,$link,$email_req=false){
    
    }
    

}