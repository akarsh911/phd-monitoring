<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supervisor extends Model
{
    use HasFactory;
    protected $table = 'supervisors';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'faculty_id',
        'student_id',
        'type'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'created_at',
    ];

  
    public function faculty()
    {
        return $this->belongsTo(Faculty::class);
    }

    
    public function student()
    {
        return $this->belongsTo(Student::class);
    }
    
    public function irbNomineeCognates()
{
    return $this->hasMany(IrbNomineeCognate::class, 'supervisor_id');
}

}
