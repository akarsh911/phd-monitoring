<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'code',
        'hod_id',
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
     * Get the head of department associated with the department.
     */
    public function hod()
    {
        return $this->belongsTo(User::class, 'hod_id');
    }

    /**
     * Get the students associated with the department.
     */
    public function students()
    {
        return $this->hasMany(Student::class);
    }
}
