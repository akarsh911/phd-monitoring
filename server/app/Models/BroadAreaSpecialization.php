<?php
// BroadAreaSpecialization.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BroadAreaSpecialization extends Model
{
    use HasFactory;

    protected $fillable = [
        'broad_area',
        'department_id'
    ];

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function students()
    {
        return $this->hasMany(StudentBroadAreaSpecialization::class, 'specialization_id');
    }
}
