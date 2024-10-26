<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Publication extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'student_id',
        'form_id',
        'form_type',
        'title',
        'authors',
        'doi_link',
        'first_page',
        'year',
        'name',
        'status',
        'country',
        'state',
        'city',
        'publisher',
        'volume',
        'page_no',
        'issn',
        'publication_type',
        'type',
        'impact_factor',
    ];
    protected $table = 'publications';
    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'year' => 'date',
        'impact_factor' => 'float',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    /**
     * Get the student associated with the publication.
     */
    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id', 'roll_no');
    }
}
