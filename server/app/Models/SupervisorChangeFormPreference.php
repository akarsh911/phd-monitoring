<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupervisorChangeFormPreference extends Model
{
    use HasFactory;

    protected $table = 'supervisor_change_form_prefrences';
    
    protected $fillable = [
        'form_id',
        'supervisor_id'
    ];

    public function form()
    {
        return $this->belongsTo(SupervisorChangeForm::class, 'form_id');
    }

    public function supervisor()
    {
        return $this->belongsTo(Faculty::class, 'supervisor_id', 'faculty_code');
    }
}