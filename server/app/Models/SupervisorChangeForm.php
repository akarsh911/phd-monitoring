<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\ModelCommonFormFields;

class SupervisorChangeForm extends Model
{
    use HasFactory, ModelCommonFormFields;

    // The table associated with the model
    protected $table = 'supervisor_change_forms';

    // The primary key associated with the table
    protected $primaryKey = 'id';

    // Indicates if the IDs are auto-incrementing
    public $incrementing = true;

    // The attributes that are mass assignable
    protected $fillable;

    // The attributes that should be cast to native types
    protected $casts = [
        'to_change' => 'array',
        'preferences' => 'array',
        'current_supervisors' => 'array',
        'new_supervisors' => 'array',
        'steps' => 'array',
        'history' => 'array', // Ensure history is treated as an array
    ];

    public function __construct(array $attributes = [])
    {
        // Merge common fields with specific fillable fields
        $commonFieldKeys = array_keys($this->getCommonFields() ?? []);
        $this->fillable = array_merge([
            'reason',
            'to_change',
            'preferences',
            'current_supervisors',
            'new_supervisors',
        ], $commonFieldKeys);

        parent::__construct($attributes);
    }

    public function fullForm($user)
    {
        // Use the common form data and merge with specific form data
        $commonJSON = $this->fullCommonForm($user);
        $formData = array_merge($commonJSON, [
            'reason' => $this->reason,
            'to_change' => $this->to_change,
            'preferences' => $this->preferences,
            'current_supervisors' => $this->current_supervisors,
            'new_supervisors' => $this->new_supervisors,
            'supervisorApprovals' => $this->supervisorApprovals->map(function($approval){
                return [
                    'supervisor_id' => $approval->supervisor_id,
                    'status' => $approval->status,
                    'comments' => $approval->comments,
                    'name' => $approval->supervisor->user->name(),
                ];
            }),
        ]);
        return $formData;
    
 }
}