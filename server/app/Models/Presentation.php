<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\ModelCommonFormFields;

class Presentation extends Model
{
    use HasFactory;
    use ModelCommonFormFields;

    // The table associated with the model
    protected $table = 'presentations';

    // The primary key associated with the table
    protected $primaryKey = 'id';

    // Indicates if the IDs are auto-incrementing
    public $incrementing = true;

    // The attributes that are mass assignable
    protected $fillable;

    // The attributes that should be cast to native types
    protected $casts = [
        'teaching_work' => 'string',
        'overall_progress' => 'string',
        'progress' => 'integer',
        'current_progress' => 'integer',
        'total_progress' => 'integer',
        'contact_hours' => 'integer',
        'attendance' => 'float',
        'history' => 'array',
        'steps' => 'array',
    ];

    public function __construct(array $attributes = [])
    {
        // Merge common fields with specific fillable fields
        $commonFieldKeys = array_keys($this->getCommonFields() ?? []);
        $this->fillable = array_merge([
            'date',
            'time',
            'venue',
            'period_of_report',
            'teaching_work',
            'presentation_pdf',
            'progress',
            'total_progress',
            'current_progress',
            'contact_hours',
            'attendance',
            'overall_progress',
        ], $commonFieldKeys);

        parent::__construct($attributes);
    }

    public function fullForm($user)
    {
        // Use the common form data and merge with specific form data
        $commonJSON = $this->fullCommonForm($user);
        $formData = array_merge($commonJSON, [
            'doctoral_committee' => $this->student->doctoralCommittee->map(function ($committee) {
                return [
                    'name' => $committee->faculty->user->name(),
                    'department' => $committee->faculty->department->name,
                    'designation' => $committee->faculty->designation,
                ];
            }),
            'date' => $this->date,
            'time' => $this->time,
            'venue' => $this->venue,
            'current_progress' => $this->current_progress,
            'period_of_report' => $this->period_of_report,


            'teaching_work' => $this->teaching_work,
            
            'progress' => $this->progress,
            'total_progress' => $this->total_progress,
            'contact_hours' => $this->contact_hours,
            'attendance' => $this->attendance,
          
            'overall_progress' => $this->overall_progress,
            'presentation_pdf' => $this->presentation_pdf,

            'supervisorReviews' => $this->supervisorReviews->map(function ($review) {
                return [
                    'faculty' => $review->faculty->user->name(),
                    'progress' => $review->progress,
                    'comments' => $review->comments,
                    'review_status' => $review->review_status,
                ];
            }),

            'doctoralCommitteeReviews' => $this->doctoralCommitteeReviews->map(function ($review) {
                return [
                    'faculty' => $review->faculty->user->name(),
                    'progress' => $review->progress,
                    'comments' => $review->comments,
                    'review_status' => $review->review_status,
                ];
            }),

        ]);
        $fac_id=$user->faculty?->faculty_code;

        if($this->student->checkDoctoralCommittee($fac_id)){
            $formData['current_review'] = $this->doctoralCommitteeReviews->where('faculty_id', $fac_id)->first();
        }
        if($this->student->checkSupervises($fac_id)){
            $formData['current_review'] = $this->supervisorReviews->where('faculty_id', $fac_id)->first();
        }

        return $formData;
    }

    public function supervisorReviews()
    {
        return $this->hasMany(PresentationReview::class, 'presentation_id', 'id')->where('is_supervisor', 1);
    }

    public function doctoralCommitteeReviews()
    {
        return $this->hasMany(PresentationReview::class, 'presentation_id', 'id')->where('is_supervisor', 0);
    }
}
