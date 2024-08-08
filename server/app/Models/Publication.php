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
        'title',
        'author',
        'co_author',
        'journal_name',
        'book_name',
        'conference_name',
        'conference_location',
        'publisher',
        'volume',
        'page_no',
        'type',
        'status',
        'conference_type',
        'journal_type',
        'date_filed',
        'year_filed',
        'date_of_publication',
        'year_of_publication',
        'impact_factor',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'date_filed' => 'date',
        'date_of_publication' => 'date',
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

    public function authors()
    {
        return $this->hasMany(PublicationAuthors::class);
    }

    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id', 'roll_no');
    }

    public function addAuthor($name, $userId = null)
    {
        return $this->authors()->create([
            'name' => $name,
            'user_id' => $userId
        ]);
    }

    public function removeAllAuthors()
    {
        return $this->authors()->delete();
    }
}
