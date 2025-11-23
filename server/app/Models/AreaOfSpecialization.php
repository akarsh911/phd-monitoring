<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AreaOfSpecialization extends Model
{
    protected $fillable = [
        'department_id',
        'name',
        'expert_name',
        'expert_email',
        'expert_phone',
        'expert_college',
    ];

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function students()
    {
        return $this->hasMany(Student::class, 'area_of_specialization_id');
    }
}
