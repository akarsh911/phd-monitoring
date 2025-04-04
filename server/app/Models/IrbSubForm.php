<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\ModelCommonFormFields;
use Illuminate\Http\Request;
use App\Http\Controllers\Traits\GeneralFormSubmitter;
class IrbSubForm extends Model
{
    use HasFactory;
    use ModelCommonFormFields;
    use GeneralFormSubmitter;

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

            'revised_phd_title',
            'revised_irb_pdf',
        ], $commonFieldKeys);

        parent::__construct($attributes);
    }

    public function fullForm($user)
    {
        // Use the common form data and merge with specific form data
        $commonJSON = $this->fullCommonForm($user);
        $formData=array_merge($commonJSON, [
            'date_of_irb' => $this->student->date_of_irb,
            'revised_phd_title' => $this->revised_phd_title,
            'revised_irb_pdf' => $this->revised_irb_pdf,
            'revised_phd_objectives' => $this->student->objectives()?->where('type', 'revised')->get()->map(function ($objective) {
                return $objective->objective;
            })->values(),
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
        if($user->current_role->role==='faculty'){
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


    public function supervisorApprovals()
    {
        return $this->hasMany(IrbSupervisorApproval::class, 'irb_sub_form_id', 'id');
    }

    public function handleApproval($email, $id, $val)
    {
        $user = User::where('email', $email)->firstOrFail();
        $request = Request::create('/', 'POST', [
            'approval' => $val,
            'comment' => ' '
        ]); 
        $model = IrbSubForm::class;
        return $this->submitForm($user, $request, $id, $model, 'external', 'faculty', 'hod');        
    }
}
