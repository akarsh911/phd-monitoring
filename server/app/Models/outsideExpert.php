<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OutsideExpert extends Model
{
    use HasFactory;

    protected $table = 'outside_experts';

    protected $fillable = [
        'first_name',
        'last_name',
        'designation',
        'department',
        'institution',
        'email',
        'phone',
    ];

    public function irbOutsideExperts()
    {
        return $this->hasMany(IrbOutsideExpert::class, 'expert_id');
    }
}
