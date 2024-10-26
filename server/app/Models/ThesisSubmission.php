<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\ModelCommonFormFields;

class ThesisSubmission extends Model
{
    use HasFactory, ModelCommonFormFields;

    protected $table = 'thesis_submissions';
    protected $fillable;

    protected $casts = [
        'history' => 'array',
        'steps' => 'array',
    ];

    public function __construct(array $attributes = [])
    {
        $commonFieldKeys = array_keys($this->getCommonFields() ?? []);
        $this->fillable = array_merge([
            'date_of_synopsis',
            'reciept_no',
            'date_of_fee_submission',
            'thesis_pdf',
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
            'date_of_synopsis' => $this->date_of_synopsis,
            'reciept_no' => $this->reciept_no,
            'date_of_fee_submission' => $this->date_of_fee_submission,
            'thesis_pdf' => $this->thesis_pdf,
            'publications' => $this->publications,
            'patents' => $this->patents,
        ]);
    }

    public function publications()
    {
        return $this->hasMany(Publication::class, 'form_id')->where('form_type', 'thesis');
    }
    

    public function patents()
    {
        return $this->hasMany(Patent::class, 'form_id')->where('form_type', 'thesis');
    }
    
}
