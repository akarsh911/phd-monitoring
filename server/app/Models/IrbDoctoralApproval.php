<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IrbDoctoralApproval extends Model
{
    use HasFactory;

    protected $table = 'irb_doctoral_approvals';
    protected $fillable = [
        'irb_sub_form_id',
        'doctoral_id',
        'status'
    ];

  
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
    public function doctoral()
    {
        return $this->belongsTo(Faculty::class, 'doctoral_id', 'faculty_code');
    }
}
