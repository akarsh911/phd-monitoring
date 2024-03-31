<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;
    protected $table = 'students';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'roll_no',
        'department_id',
        'date_of_registration',
        'date_of_irb',
        'phd_title',
        'fathers_name',
        'address',
        'current_status',
        'overall_progress',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'date_of_registration' => 'date',
        'date_of_irb' => 'date',
        'overall_progress' => 'float',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    /**
     * Get the user associated with the student.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the department associated with the student.
     */
    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function supervisors()
    {
        return $this->belongsToMany(Student::class, 'supervisors', 'studnt_id', 'faculty_id');
    }

    public function doctoralCommittee()
    {
        return $this->belongsToMany(Student::class, 'doctoral_committee', 'student_id', 'faculty_id');
    }

}
