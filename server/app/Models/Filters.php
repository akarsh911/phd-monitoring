<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Filters extends Model
{
    protected $table = 'filters';
    
    protected $fillable = [
        'key_name',
        'label',
        'data_type',
        'function_name',
        'applicable_pages',
        'operator',
        'options',
        'api_url',
    ];
    protected $casts = [
        'options' => 'array',
        'applicable_pages' => 'array',
    ];
   
    
 
}
