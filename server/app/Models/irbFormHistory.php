<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IrbFormHistory extends Model
{
    use HasFactory;

    protected $table = 'irb_form_histories';

    protected $fillable = [
        'irb_form_id',
        'stage',
        'status',
        'user_id',
        'change',
    ];

    public function irbForm()
    {
        return $this->belongsTo(IrbForm::class, 'irb_form_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
