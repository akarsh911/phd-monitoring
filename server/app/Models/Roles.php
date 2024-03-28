<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'can_read_all_students',
        'can_read_all_faculties',
        'can_read_supervised_students',
        'can_read_department_students',
        'can_read_department_faculties',
        'can_edit_all_students',
        'can_edit_all_faculties',
        'can_edit_department_students',
        'can_edit_department_faculties',
        'can_edit_own_profile',
        'can_edit_phd_title',
        'can_add_department_students',
        'can_add_department_faculties',
        'can_add_faculties',
        'can_add_students',
        'can_read_supervisors',
        'can_read_doctoral_committee',
        'can_edit_supervisors',
        'can_edit_doctoral_committee',
        'can_delete_department_students',
        'can_delete_department_faculties',
        'can_delete_faculties',
        'can_delete_students',
        'can_manage_roles',
        'can_edit_department',
        'can_add_department',
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
}
