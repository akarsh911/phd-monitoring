<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IrbFormObjective extends Model
{
    use HasFactory;

    // The table associated with the model
    protected $table = 'irb_form_objectives';

    // The primary key associated with the table
    protected $primaryKey = 'id';

    // Indicates if the IDs are auto-incrementing
    public $incrementing = true;

    // The attributes that are mass assignable
    protected $fillable = [
        'irb_form_id',
        'objective',
        'type',
    ];

    // The attributes that should be cast to native types
    protected $casts = [
        'type' => 'string',
    ];

    // Relationships
    public function irbForm()
    {
        return $this->belongsTo(IrbSubForm::class, 'irb_form_id', 'id');
    }
}
