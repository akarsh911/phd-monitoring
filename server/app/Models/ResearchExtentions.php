<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResearchExtentions extends Model
{
    use HasFactory;

    protected $table = 'research_extentions';

    protected $fillable = [
        'research_extentions_id',
        'student_id',
        'period_of_extension',
        'reason'
    ];

    public function researchExtentionsForm()
    {
        return $this->belongsTo(ResearchExtentionsForm::class, 'research_extentions_id');
    }

    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id', 'roll_no');
    }
}
