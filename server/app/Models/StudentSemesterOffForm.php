<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\ModelCommonFormFields;

class StudentSemesterOffForm extends Model
{
    use HasFactory, ModelCommonFormFields;

    protected $table = 'student_semester_off_forms';
    protected $fillable;

    protected $casts = [
        'history' => 'array',
        'steps' => 'array',
    ];

    public function __construct(array $attributes = [])
    {
        $commonFieldKeys = array_keys($this->getCommonFields() ?? []);
        $this->fillable = array_merge([
            'previous_approval_pdf',
            'semester_off_required',
            'proof_pdf',
            'reason',
        ], $commonFieldKeys);

        parent::__construct($attributes);
    }

    /**
     * Get the full form data including common fields.
     */
    public function fullForm($user)
    {
        $commonJSON = $this->fullCommonForm($user);
        return array_merge($commonJSON, [
            'previous_approval_pdf' => $this->previous_approval_pdf,
            'semester_off_required' => $this->semester_off_required,
            'proof_pdf' => $this->proof_pdf,
            'reason' => $this->reason,
            'previous_off'=>$this->student->semester_offs
        ]);
    }

    // Additional methods for handling relationships can be added here if needed.
}
