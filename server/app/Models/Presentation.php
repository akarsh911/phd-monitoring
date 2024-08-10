<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Presentation extends Model
{
    use HasFactory;
    protected $table='presentations';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'student_id',
        'date',
        'time',
        'period_of_report',
        'teaching_work',
        'status',
        'locked',
        'progress',
        'overall_progress',
        'student_lock',
        'supervisor_lock',
        'hod_lock',
        'dordc_lock',
        'dra_lock',
        'SuperVisorComments',
        'HODComments',
        'DORDCComments',
        'DRAComments',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'date' => 'date',
        'progress' => 'integer',
        'student_lock' => 'boolean',
        'supervisor_lock' => 'boolean',
        'hod_lock' => 'boolean',
        'dordc_lock' => 'boolean',
        'dra_lock' => 'boolean',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    /**
     * Get the student associated with the presentation.
     */
    public function fullData($user)
    {
        return [
            'name'=> $this->student->user->name(),
            'roll_no' => $this->student->roll_no,
            'department' => $this->student->department->name,
            'date_of_registration' => $this->student->date_of_registration,
            'phd_title' => $this->student->phd_title,
            'period_of_report' => $this->period_of_report,
            'date_of_irb'=>$this->student->date_of_irb,
            'teaching_work'=>$this->teaching_work,
            'prev_progress'=>$this->student->overall_progress,
            'progress'=>$this->progress,
            'extention'=>$this->student->researchExtentions,
            'publications' => $this->student->publications->map(function($publication){
                return [
                    'publication'=>$publication,
                    'authors'=>$publication->authors->map(function($author){
                        $name=$author->user?->name;
                        if($name!=null) return $name;
                        else return $author->name;
                    })->all(),
                    ];
            })->all(),
            'supervisorReviews'=> $this->supervisorReviews?->map(function($review){
                return [
                    'faculty'=>$review->faculty->user->name(),
                    'progress'=>$review->progress,
                    'comments'=>$review->comments,
                    'review_status'=>$review->review_status,
                ];
            }),
            'doctoralCommitteeReviews'=> $this->doctoralCommitteeReviews?->map(function($review){
                return [
                    'faculty'=>$review->faculty->user->name(),
                    'progress'=>$review->progress,
                    'comments'=>$review->comments,
                    'review_status'=>$review->review_status,
                ];
            }),
            'status'=>$this->status,
            'HODComments' => $this->HODComments,
            'DORDCComments' => $this->DORDCComments,
            'DRAComments' => $this->DRAComments,
            'student_lock' => $this->student_lock,
            'hod_lock' => $this->hod_lock,
            'supervisor_lock' => $this->supervisor_lock,
            'dordc_lock' => $this->dordc_lock,
            'dra_lock' => $this->dra_lock,
            'role' => $user->role->role,
        ];
    }

    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id', 'roll_no');
    }

    public function supervisorReviews()
    {
        return $this->hasMany(PresentationReview::class, 'presentation_id', 'id')->where('is_supervisor', 'Yes');
    }
    public function doctoralCommitteeReviews()
    {
        return $this->hasMany(PresentationReview::class, 'presentation_id', 'id')->where('is_supervisor', 'No');
    }
}
