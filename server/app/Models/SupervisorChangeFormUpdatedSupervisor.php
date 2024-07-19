<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupervisorChangeFormUpdatedSupervisor extends Model
{
    use HasFactory;

    protected $table = 'supervisor_change_form_updated_supervisors';
    
    protected $fillable = [
        'form_id',
        'old_supervisor_id',
        'new_supervisor_id'
    ];

    public function form()
    {
        return $this->belongsTo(SupervisorChangeForm::class, 'form_id');
    }

    public function oldSupervisor()
    {
        return $this->belongsTo(Faculty::class, 'old_supervisor_id', 'faculty_code');
    }

    public function newSupervisor()
    {
        return $this->belongsTo(Faculty::class, 'new_supervisor_id', 'faculty_code');
    }
}
