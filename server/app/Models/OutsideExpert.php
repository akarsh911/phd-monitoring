<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OutsideExpert extends Model
{
    use HasFactory;

    protected $table = 'outside_experts';

    protected $fillable = [
        'first_name',
        'last_name',
        'designation',
        'department',
        'institution',
        'email',
        'phone',
        'area_of_expertise',
        'website',
    ];

    public function irbOutsideExperts()
    {
        return $this->hasMany(IrbOutsideExpert::class, 'expert_id');
    }

    public function irbCommittees()
{
    return $this->morphMany(IRBCommittee::class, 'member');
}

    /**
     * Get or create faculty for this outside expert
     */
    public function getFaculty()
    {
        // Check if faculty exists by email
        $user = \App\Models\User::where('email', $this->email)->first();
        
        if ($user && $user->faculty) {
            return $user->faculty;
        }

        // Create new user if doesn't exist
        if (!$user) {
            $user = \App\Models\User::create([
                'first_name' => $this->first_name,
                'last_name' => $this->last_name,
                'email' => $this->email,
                'phone' => $this->phone,
                'password' => bcrypt('password123'), // Default password
                'role_id' => 1, // Default role
                'current_role_id' => 1,
                'default_role_id' => 1,
                'status' => 'active',
            ]);
        }

        // Create faculty with arbitrary faculty code
        $facultyCode = '777' . str_pad($user->id, 6, '0', STR_PAD_LEFT);
        
        $faculty = \App\Models\Faculty::create([
            'user_id' => $user->id,
            'faculty_code' => $facultyCode,
            'designation' => $this->designation,
            'department_id' => null, // External experts don't belong to a department
        ]);

        return $faculty;
    }

}
