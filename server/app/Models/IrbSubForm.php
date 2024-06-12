<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IrbSubForm extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'status',
        'stage',
        'student_comments',
        'supervisor_comments',
        'phd_coordinator_comments',
        'hod_comments',
    ];

    /**
     * Get the student associated with the IRB sub form.
     */
    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id', 'roll_no');
    }

    /**
     * Scope a query to only include IRB sub forms for a specific student.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param int $studentId
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeForStudent($query, $studentId)
    {
        return $query->where('student_id', $studentId);
    }

    /**
     * Scope a query to only include IRB sub forms with a specific status.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string $status
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeWithStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    /**
     * Scope a query to only include IRB sub forms with a specific stage.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string $stage
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeWithStage($query, $stage)
    {
        return $query->where('stage', $stage);
    }
}
