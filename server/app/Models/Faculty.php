<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Faculty extends Model
{
    use HasFactory;
    protected $table = 'faculty';
    protected $primaryKey = 'faculty_code'; 
    public $incrementing = false;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'designation',
        'department_id',
        'faculty_code',
        'supervised_campus',
        'supervied_outside',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
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
     * Get the user associated with the faculty.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the department associated with the faculty.
     */
    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function supervisedStudents()
    {
        return $this->belongsToMany(Student::class, 'supervisors',  'faculty_id', 'student_id',  'faculty_code','roll_no');
    }

    public function doctoredStudents()
    {
        return $this->belongsToMany(Student::class, 'doctoral_committee', 'faculty_id', 'student_id');

    }
    public function supervisedForms()
    {
        return $this->hasMany(IrbForm::class, 'supervisor_id');
    }

    public function irbNomineeCognates()
    {
        return $this->hasMany(IrbNomineeCognate::class, 'nominee_id', 'faculty_code');
    }

    public function irbExpertDepartments()
    {
        return $this->hasMany(IrbExpertDepartment::class, 'expert_id', 'faculty_code');
    }
    public static function findByUserId($userId)
    {
        return self::where('user_id', $userId)->first();
    }

}
