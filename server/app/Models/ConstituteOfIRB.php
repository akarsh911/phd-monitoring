<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\ModelCommonFormFields;


class ConstituteOfIRB extends Model
{
    use HasFactory;
    use ModelCommonFormFields;
    protected $table = 'constitute_of_irb';
    protected $fillable;

    protected $casts = [
        'history' => 'array', 
        'steps' => 'array',
    ];

    public function __construct(array $attributes = [])
    {
        $commonFieldKeys = array_keys($this->getCommonFields() ?? []);
        $this->fillable = array_merge([
            'cognate_expert',
            'outside_expert',
        ], $commonFieldKeys);
     
        parent::__construct($attributes);
    }


    public function fullForm($user)
    {
        $commonJSON = $this->fullCommonForm($user);
        return array_merge($commonJSON, [
            'nominee_cognates' => $this->nomineeCognates->map(function ($nominee) {
                return [
                    'faculty_code' => $nominee->nominee->faculty_code,
                    'name' => $nominee->nominee->user->name(),
                    'designation' => $nominee->nominee->designation,
                    'department' => $nominee->nominee->department->name,
                ];
            }),
            'outside_experts' => $this->outsideExperts->map(function ($expert) {
                $expert = $expert->expert;
                return [
                    'id' => $expert->id,
                    'first_name' => $expert->first_name,
                    'last_name' => $expert->last_name,
                    'designation' => $expert->designation,
                    'department' => $expert->department,
                    'institution' => $expert->institution,
                    'email' => $expert->email,
                    'phone' => $expert->phone
                ];
            }),
            'chairman_experts' => $this->chairmanExperts->map(function ($expert) {
                return [
                    'name' => $expert->expert->user->name(),
                    'designation' => $expert->expert->designation,
                    'department' => $expert->expert->department->name,
                    'faculty_code' => $expert->expert->user->faculty->faculty_code,
                ];
            }),
            'cognate_expert' => $this->expertCognate ? [
                'faculty_code' => $this->expertCognate->faculty_code,
                'name' => $this->expertCognate->user->name(),
            ] : null,
            'outside_expert' => $this->expertOutside ? [
                'id' => $this->expertOutside->id,
                'first_name' => $this->expertOutside->first_name,
                'last_name' => $this->expertOutside->last_name,
                'designation' => $this->expertOutside->designation,
                'department' => $this->expertOutside->department,
                'institution' => $this->expertOutside->institution,
                'email' => $this->expertOutside->email,
                'phone' => $this->expertOutside->phone
            ] : null,

        ]);
    }

    public function nomineeCognates()
    {
        return $this->hasMany(IrbNomineeCognate::class, 'irb_form_id', 'id');
    }

    public function outsideExperts()
    {
        return $this->hasMany(IrbOutsideExpert::class, 'irb_form_id');
    }

    public function expertDepartments()
    {
        return $this->hasMany(IrbExpertDepartment::class, 'irb_form_id');
    }

    public function supervisorApprovals()
    {

        return $this->hasMany(IrbSupervisorApproval::class, 'irb_form_id', 'id');
    }

    public function chairmanExperts()
    {
        return $this->hasMany(IrbExpertChairman::class, 'irb_form_id');
    }

    public function expertCognate()
    {
        return $this->belongsTo(Faculty::class, 'expert_cognate', 'faculty_code');
    }

    public function expertOutside()
    {
        return $this->belongsTo(OutsideExpert::class, 'expert_outside', 'id');
    }
}
