<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'phone',
        'email',
        'gender',
        'role_id',
        'current_role_id',
        'default_role_id',
        'profile_picture',
        'address',
        'password',
        'email_verified_at',
        'first_activation',
        'status',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'email_verified_at',
        'created_at',
        'updated_at',
    ];
     
    public function name(){
        return $this->first_name.' '.$this->last_name;
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    public function role()
    {
        return $this->belongsTo(Role::class, 'role_id');
    }

    public function current_role()
    {
        return $this->belongsTo(Role::class, 'current_role_id');
    }

    public function default_role()
    {
        return $this->belongsTo(Role::class, 'default_role_id');
    }

    public function student()
    {
        return $this->hasOne(Student::class,'user_id');
    }

    public function faculty()
    {
        return $this->hasOne(Faculty::class,'user_id');
    }
   
    public function notifications()
    {
        return $this->hasMany(Notifications::class);
    }

    public function availableRoles()
    {
        $roles=[];
        if($this->role->role == 'student'){
            array_push($roles,'student');
        }
        if($this->role->role == 'faculty'){
            array_push($roles,'doctoral');
            array_push($roles,'faculty');
        }
        if($this->role->role == 'phd_coordinator'){
            array_push($roles,'doctoral');
            array_push($roles,'faculty');
            array_push($roles,'phd_coordinator');
        }
        if($this->role->role == 'hod'){
            array_push($roles,'doctoral');
            array_push($roles,'faculty');
            array_push($roles,'phd_coordinator');
        }
        if($this->role->role == 'external'){
            array_push($roles,'doctoral');
            array_push($roles,'external');  
        }
        if($this->role->role == 'dra'){
            array_push($roles,'dra');
        }
        if($this->role->role == 'dordc'){
            array_push($roles,'dordc');
        }
        if($this->role->role == 'director'){
            array_push($roles,'director');
        }
        return $roles;
    }

    public function isAuthorized($role){
        $roles = $this->availableRoles();
        return in_array($role,$roles);
    }
}
