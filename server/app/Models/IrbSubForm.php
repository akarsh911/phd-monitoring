<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\ModelCommonFormFields;

class IrbSubForm extends Model
{
    use HasFactory;
    use ModelCommonFormFields;

    // The table associated with the model
    protected $table = 'irb_sub_forms';

    // The primary key associated with the table
    protected $primaryKey = 'id';

    // Indicates if the IDs are auto-incrementing
    public $incrementing = true;

    // The attributes that are mass assignable
    protected $fillable;

    // The attributes that should be cast to native types
    protected $casts = [
        'form_type' => 'string',
        'status' => 'string',
        'stage' => 'string',
        'steps' => 'array',
        'history' => 'array', // Ensure history is treated as an array
    ];

    public function __construct(array $attributes = [])
    {
        // Merge common fields with specific fillable fields
        $commonFieldKeys = array_keys($this->getCommonFields() ?? []);
        $this->fillable = array_merge([
            'form_type',
            'phd_title',
            'revised_phd_title',
            'irb_pdf',
            'revised_irb_pdf',
        ], $commonFieldKeys);

        parent::__construct($attributes);
    }

    public function fullForm($user)
    {
        // Use the common form data and merge with specific form data
        $commonJSON = $this->fullCommonForm($user);
        $formData=array_merge($commonJSON, [
            'form_type' => $this->form_type,
            'objectives' => [
                'revised' => $this->objectives->where('type', 'revised')->map(function($objective){
                    return [
                        'objective' => $objective->objective,
                        'type' => $objective->type,
                    ];
                }),
                'draft' => $this->objectives->where('type', 'draft')->map(function($objective){
                    return [
                        'objective' => $objective->objective,
                        'type' => $objective->type,
                    ];
                }),
            ],
            'date_of_irb' => $this->student->date_of_irb,
            'address' => $this->student->address,
            'revised_phd_title' => $this->revised_phd_title,
            'irb_pdf' => $this->irb_pdf,
            'revised_irb_pdf' => $this->revised_irb_pdf,
            'supervisorApprovals' => $this->supervisorApprovals->map(function($approval){
                return [
                    'supervisor_id' => $approval->supervisor_id,
                    'status' => $approval->status,
                    'comments' => $approval->comments,
                    'name' => $approval->supervisor->user->name(),                
                ];
            }),
        ]);
        $formData['supervisors']=$this->student->supervisors->map(function ($supervisor) {
            return [
                'name' => $supervisor->user->name(),
                'designation' => $supervisor->designation,
                'department' => $supervisor->department->name,
                'supervised_campus'=>$supervisor->supervised_campus+1,
                'supervised_outside'=>$supervisor->supervised_outside,
            ];
        });
        if($user->role->role){
            $currentSupervisor = $this->student->supervisors->where('faculty_code', $user->faculty->faculty_code)->first();
            if ($currentSupervisor) {
            $formData['current_supervisor'] = [
                'name' => $currentSupervisor->user->name(),
                'designation' => $currentSupervisor->designation,
                'department' => $currentSupervisor->department->name,
                'supervised_campus' => $currentSupervisor->supervised_campus,
                'supervised_outside' => $currentSupervisor->supervised_outside,
            ];
            }
        }
        return $formData;
    }

    public function objectives()
    {
        return $this->hasMany(IrbFormObjective::class, 'irb_form_id', 'id');
    }

    public function supervisorApprovals()
    {
        return $this->hasMany(IrbSupervisorApproval::class, 'irb_sub_form_id', 'id');
    }
}
