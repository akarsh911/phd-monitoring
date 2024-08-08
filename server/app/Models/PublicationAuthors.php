<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PublicationAuthors extends Model
{
    use HasFactory;
    protected $table = 'publication_authors';
    public $timestamps = false;

    protected $fillable = [
        'publication_id',
        'name',
        'user_id'
    ];

    public function publication()
    {
        return $this->belongsTo(Publication::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getAuthor()
    {
        $user=User::find($this->user_id);
        if($user->role->role=='student'){
            return $user->student;
        }
        return $user->faculty;
    }
}
