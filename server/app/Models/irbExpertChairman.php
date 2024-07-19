<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class  irbExpertChairman extends Model
{
    use HasFactory;
    protected $table = 'irb_expert_chairmen';
    protected $fillable = ['irb_form_id','expert_id'];
    public $timestamps = false;

    public function irbForm()
    {
        return $this->belongsTo(IrbForm::class, 'irb_form_id');
    }
    
    public function expert()
    {
        return $this->belongsTo(Faculty::class, 'expert_id','faculty_code');
    }
}
