<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ListOfExaminersRecommendation extends Model
{
    use HasFactory;

    protected $table = 'list_of_examiners_recommendations';

    protected $fillable = [
        'form_id',
        'examiner_id',
        'recommendation'
    ];

    public function form()
    {
        return $this->belongsTo(ListOfExaminersForm::class, 'form_id');
    }

    public function examiner()
    {
        return $this->belongsTo(ExaminersDetail::class, 'examiner_id');
    }
}
