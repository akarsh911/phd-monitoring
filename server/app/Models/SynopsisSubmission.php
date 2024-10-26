<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\ModelCommonFormFields;

class SynopsisSubmission extends Model
{
    use HasFactory, ModelCommonFormFields;

    protected $table = 'synopsis_submissions';
    protected $fillable;

    protected $casts = [
        'history' => 'array',
        'steps' => 'array',
    ];

    public function __construct(array $attributes = [])
    {
        $commonFieldKeys = array_keys($this->getCommonFields() ?? []);
        $this->fillable = array_merge([
            'current_progress',
            'revised_title',
            'synopsis_pdf',
            'total_progress',
        ], $commonFieldKeys);

        parent::__construct($attributes);
    }

    /**
     * Get the full form data including common fields.
     */
    public function fullForm($user)
    {
        $irbFormId = IrbSubForm::where('student_id', $user->student->roll_no)->latest()->first()->id;
        $commonJSON = $this->fullCommonForm($user);
        return array_merge($commonJSON, [
            'current_progress' => $this->current_progress,
            'revised_title' => $this->revised_title,
            'synopsis_pdf' => $this->synopsis_pdf,
            'total_progress' => $this->total_progress,
            'previous_progress'=>$this->student->overall_progress,
            'publications' => $this->publications,
            'patents' => $this->patents,
            'revised_objectives' => $this->objectives->map(function ($objective) {
                return $objective->objective;
            }),
            'objectives' => IrbFormObjective::where('irb_form_id', $irbFormId)
            ->where('type','revised')
            ->get()
            ->map(function ($objective) {
                return $objective->objective;
            }),
        ]);
    }

    public function objectives()
    {
        return $this->hasMany(SynopsisObjectives::class, 'synopsis_id', 'id');
    }

    public function publications()
    {
        return $this->hasMany(Publication::class, 'form_id')->where('form_type', 'synopsis');
    }
    public function patents()
    {
        return $this->hasMany(Patent::class, 'form_id')->where('form_type', 'synopsis');
    }

}
