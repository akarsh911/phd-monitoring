<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IrbSupervisorApproval extends Model
{
    use HasFactory;

    protected $table = 'irb_supervisor_approvals';
    protected $fillable = [
        'form_type',
        'irb_form_id',
        'irb_sub_form_id',
        'supervisor_id',
        'status'
    ];

    /**
     * Get the IRB form associated with the approval.
     */
    public function irbForm()
    {
        return $this->belongsTo(IrbForm::class, 'irb_form_id');
    }

    /**
     * Get the IRB sub-form associated with the approval.
     */
    public function irbSubForm()
    {
        return $this->belongsTo(IrbSubForm::class, 'irb_sub_form_id');
    }

    /**
     * Get the supervisor associated with the approval.
     */
    public function supervisor()
    {
        return $this->belongsTo(Faculty::class, 'supervisor_id', 'faculty_code');
    }
}
