<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConstituteIrbSupervisorApproval extends Model
{
    protected $table = 'constitute_irb_supervisor_approvals';
    protected $fillable = [
        'irb_cons_form_id',
        'supervisor_id',
        'status'
    ];

  
    /**
     * Get the IRB sub-form associated with the approval.
     */
    public function ConstituteOfIRBForm()
    {
        return $this->belongsTo(ConstituteOfIRB::class, 'irb_cons_form_id');
    }

    /**
     * Get the supervisor associated with the approval.
     */
    public function supervisor()
    {
        return $this->belongsTo(Faculty::class, 'supervisor_id', 'faculty_code');
    }
}
