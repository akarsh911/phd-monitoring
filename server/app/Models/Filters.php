<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Filters extends Model
{
    protected $fillable = [
        'key_name',
        'label',
        'data_type',
        'function_name',
        'applicable_pages',
    ];
}
