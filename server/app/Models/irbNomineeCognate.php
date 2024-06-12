<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IrbNomineeCognate extends Model
{
    use HasFactory;

    protected $table = 'irb_nominee_cognates';

    protected $fillable = [
        'irb_form_id',
        'supervisor_id',
        'nominee_id',
        'status',
    ];

    public function irbForm()
    {
        return $this->belongsTo(IrbForm::class, 'irb_form_id');
    }

    public function supervisor()
    {
        return $this->belongsTo(Faculty::class, 'supervisor_id');
    }

    public function nominee()
    {
        return $this->belongsTo(Faculty::class, 'nominee_id', 'faculty_code');
    }
}
