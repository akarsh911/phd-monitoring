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
        'expert_website',
        'expert_designation'
    ];

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function students()
    {
        return $this->hasMany(Student::class, 'area_of_specialization_id');
    }

    public function getExpertFaculty()
    {
        // Check if faculty exists by email
        $user = \App\Models\User::where('email', $this->expert_email)->first();
        
        if ($user && $user->faculty) {
            return $user->faculty;
        }

        // Create new user if doesn't exist
        if (!$user) {
            $user = \App\Models\User::create([
                'first_name' => $this->expert_name,
                'last_name' => '',
                'email' => $this->expert_email,
                'phone' => $this->expert_phone,
                'password' => bcrypt('Password@123'), // Default password
                'role_id' => 4, // Default role
                'current_role_id' => 4,
                'default_role_id' => 4,
                'status' => 'active',
            ]);
        }

        // Create faculty with arbitrary faculty code
        $facultyCode = 'EXT' . str_pad($user->id, 6, '0', STR_PAD_LEFT);
        
        $faculty = \App\Models\Faculty::create([
            'user_id' => $user->id,
            'faculty_code' => $facultyCode,
            'designation' => $this->expert_designation,
            'department_id' => $this->department_id,
        ]);

        return $faculty;
    }
}
