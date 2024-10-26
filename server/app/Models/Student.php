<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $table = 'students';
    protected $primaryKey = 'roll_no'; 
    public $incrementing = false;
    
    protected $fillable = [
        'user_id',
        'roll_no',
        'department_id',
        'date_of_registration',
        'date_of_irb',
        'date_of_synopsis',
        'phd_title',
        'fathers_name',
        'address',
        'current_status',
        'cgpa',
        'overall_progress',
    ];

    protected $casts = [
        'date_of_registration' => 'date',
        'date_of_irb' => 'date',
        'date_of_synopsis' => 'date',
        'overall_progress' => 'float',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function getStudent()
    {
        return [
            'name'=>$this->user->name,
            'roll_no'=>$this->roll_no,
            'department'=>$this->department->name,
            'date_of_registration'=>$this->date_of_registration,
            'date_of_irb'=>$this->date_of_irb,
            'date_of_synopsis'=>$this->date_of_synopsis,
            'phd_title'=>$this->phd_title,
            'fathers_name'=>$this->fathers_name,
            'address'=>$this->address,
            'current_status'=>$this->current_status,
            'cgpa'=>$this->cgpa,
            'address'=>$this->address
        ];
    }
    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function supervisors()
    {
        return $this->belongsToMany(Faculty::class, 'supervisors', 'student_id', 'faculty_id', 'roll_no', 'faculty_code');
    }

    public function checkIrbCompletionStatus()
    {
        $irbForm = $this->irbForm()->first();
        $irbSubForm = $this->irbSubForms()->first();

        if ($irbForm && $irbSubForm && $irbForm->status == 'approved' && $irbSubForm->status == 'dra') {
            return true;
        } else {
            return false;
        }
    }
    
    public function statusChanges()
    {
        return $this->hasMany(StudentStatusChange::class, 'student_id', 'roll_no');
    }

    public function supervisor_update_date()
    {
        $last_update= Supervisor::where('student_id', $this->roll_no)->orderBy('updated_at', 'desc')->first();
        return $last_update->updated_at;
    }

    public function doctoralCommittee()
    {
        return $this->belongsToMany(Faculty::class, 'doctoral_committee', 'student_id', 'faculty_id', 'roll_no', 'faculty_code');
    }

    public function checkDoctoralCommittee($facultyId)
    {
        return $this->doctoralCommittee->contains('faculty_code', $facultyId);
    }

    public function hod()
    {
        return $this->department()->first()->hod();
    }

    public function irbForm()
    {
        return $this->hasOne(IrbForm::class, 'student_id', 'roll_no');
    }

    public function irbSubForm()
    {
        return $this->hasOne(IrbSubForm::class, 'student_id', 'roll_no');
    }
    
    public function statusChangeForms()
    {
        return $this->hasOne(StudentStatusChangeForms::class, 'student_id', 'roll_no');
    }

    public static function findByUserId($userId)
    {
        return self::where('user_id', $userId)->first();
    }

    public function checkSupervises($facultyId)
    {
        return $this->supervisors->contains('faculty_code',$facultyId);
    }

    public function checkHOD($facultyId)
    {
        return $this->department->first()->hod_id == $facultyId;
    }

    public function checkPhdCoordinator($facultyId)
    {
        return $this->department->phdCoordinators->contains($facultyId);
    }


    public static function createIrbFormForStudent($student)
    {
        $irbNewForm = IrbForm::create([
            'student_id' => $student->roll_no,
            'status' => 'awaited',
            'stage' => 'student',
            'SuperVisorComments' => null,
            'HODComments' => null,
            'DORDCComments' => null,
            'DRAComments' => null,
        ]);
        IrbFormHistory::create([
            'irb_form_id' => $irbNewForm->id,
            'user_id' => $student->user_id,
            'status' => 'awaited',
            'stage' => 'student',
            'change' => "Form created by student",
        ]);
        return $irbNewForm;
    }

    public function researchExtentionsForm()
    {
        return $this->hasOne(ResearchExtentionsForm::class, 'student_id', 'roll_no');
    }

    public function researchExtentions()
    {
        return $this->hasMany(ResearchExtentions::class, 'student_id', 'roll_no');
    }

    public function supervisorChangeForm()
    {
        return $this->hasOne(SupervisorChangeForm::class, 'student_id', 'roll_no');
    }

    public function broad_area_specialization()
    {
        return $this->hasMany(StudentBroadAreaSpecialization::class, 'student_id', 'roll_no');
    }


    public function publications()
    {
        return $this->hasMany(Publication::class, 'student_id', 'roll_no');
    }

    public function semester_offs()
    {
        return $this->hasMany(StudentSemesterOff::class, 'student_id', 'roll_no');
    }
}
