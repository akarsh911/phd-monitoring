<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IRBCommittee extends Model
{
    use HasFactory;

    protected $table = 'irb_committees';

    protected $fillable = [
        'student_id',
        'type',
        'member_id',
        'member_type',
    ];

    /**
     * Get the related member (Faculty or OutsideExpert).
     */
    public function member()
    {
        return $this->morphTo();
    }

    /**
     * Get the student this committee is linked to.
     */
    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id', 'roll_no');
    }

    /**
     * Check if the member is a faculty member.
     */
    public function isInside()
    {
        return $this->type === 'inside' && $this->member_type === Faculty::class;
    }

    /**
     * Check if the member is an outside expert.
     */
    public function isOutside()
    {
        return $this->type === 'outside' && $this->member_type === OutsideExpert::class;
    }
}
