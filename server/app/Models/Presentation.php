<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Presentation extends Model
{
    use HasFactory;
    protected $table='presentations';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'student_id',
        'date',
        'time',
        'period_of_report',
        'teaching_work',
        'status',
        'locked',
        'progress',
        'overall_progress',
        'student_lock',
        'supervisor_lock',
        'hod_lock',
        'dordc_lock',
        'dra_lock',
        'SuperVisorComments',
        'HODComments',
        'DORDCComments',
        'DRAComments',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'date' => 'date',
        'progress' => 'integer',
        'student_lock' => 'boolean',
        'supervisor_lock' => 'boolean',
        'hod_lock' => 'boolean',
        'dordc_lock' => 'boolean',
        'dra_lock' => 'boolean',
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
     * Get the student associated with the presentation.
     */
    public function FullData()
    {
        return [
            'presentation' => $this,
            'student' => $this->student,
            'roll_no' => $this->student->roll_no,
            'name' => $this->student->name,
            'period_of_report' => $this->period_of_report,
            'date_of_irb' => $this->student->date_of_irb,
            'title_of_thesis' => $this->student->title_of_thesis,
            'extentions'=> $this->student->extentions,
            'publications' => $this->student->publications,
            'reviews' => $this->reviews
        ];
    }

    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id', 'roll_no');
    }
}
