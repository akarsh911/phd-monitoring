<?php

// app/Models/Approval.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Approval extends Model
{
    use HasFactory;

    protected $fillable = ['key', 'email', 'action', 'model_type', 'model_id', 'approved'];

    public static function generateKey()
    {
        return bin2hex(random_bytes(32)); // Generates a 64-character key
    }

    public function approvable()
    {
        return $this->morphTo();
    }
}
