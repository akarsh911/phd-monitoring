<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupervisorDoctoralChange extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'change_type',
        'member_type',
        'faculty_type',
        'old_faculty_code',
        'new_faculty_code',
        'outside_expert_id',
        'reason',
        'status',
        'requested_by',
        'approved_by',
        'approved_at',
        'rejection_reason',
    ];

    protected $casts = [
        'approved_at' => 'datetime',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id', 'roll_no');
    }

    public function requester()
    {
        return $this->belongsTo(User::class, 'requested_by');
    }

    public function approver()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function oldFaculty()
    {
        return $this->belongsTo(Faculty::class, 'old_faculty_code', 'faculty_code');
    }

    public function newFaculty()
    {
        return $this->belongsTo(Faculty::class, 'new_faculty_code', 'faculty_code');
    }

    public function outsideExpert()
    {
        return $this->belongsTo(OutsideExpert::class, 'outside_expert_id');
    }
}
