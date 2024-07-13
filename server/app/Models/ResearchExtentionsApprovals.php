<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResearchExtentionsApprovals extends Model
{
    use HasFactory;

    protected $table = 'research_extentions_approvals';

    protected $fillable = [
        'research_extentions_id',
        'supervisor_id',
        'status',
        'comments'
    ];

    public function researchExtentionsForm()
    {
        return $this->belongsTo(ResearchExtentionsForm::class, 'research_extentions_id');
    }

    public function supervisor()
    {
        return $this->belongsTo(Faculty::class, 'supervisor_id', 'faculty_code');
    }
    public function getBySupervisorId($id,$form_id)
    {
        return $this->where('supervisor_id', $id)->where('research_extentions_id',$form_id)->first();
    }
}
