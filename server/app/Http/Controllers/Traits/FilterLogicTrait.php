<?php

namespace App\Http\Controllers\Traits;

use App\Models\Student;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

trait FilterLogicTrait
{

    protected function applyHasNestedRelationFilters($query, array $filters, $combinator = 'and')
{
    $combinator = strtolower($combinator);

    $method = $combinator === 'or' ? 'orWhereHas' : 'whereHas';

    foreach ($filters as $filter) {
        $relation = $filter['relation'] ?? null;
        $field = $filter['field'] ?? null;
        $operator = $filter['operator'] ?? '=';
        $value = $filter['value'] ?? null;

        if (!$relation || !$field || $value === null) continue;

        $query->{$method}($relation, function ($q) use ($field, $operator, $value) {
            switch (strtolower($operator)) {
                case 'like':
                    $q->where($field, 'LIKE', "%$value%");
                    break;
                case 'in':
                    $q->whereIn($field, explode(',', $value));
                    break;
                case 'null':
                    $q->whereNull($field);
                    break;
                case 'notnull':
                    $q->whereNotNull($field);
                    break;
                default:
                    $q->where($field, $operator, $value);
            }
        });
    }

    return $query;
}

//working

public function applyDynamicFilters($query, $filters)
{
    $combine = strtolower($filters['combine'] ?? 'and');
    $filterList = $filters['conditions'] ?? [];
    $mandatoryFilter = $filters['mandatory_filter'] ?? null;

    Log::info('Applying dynamic filters', [
        'combine' => $combine,
        'filters' => $filterList,
        'mandatory_filter' => $mandatoryFilter
    ]);

    // Apply mandatory filter first (if any)
    if ($mandatoryFilter && isset($mandatoryFilter['key'], $mandatoryFilter['value'])) {
        $relationPath = explode('.', $mandatoryFilter['key']);
        $column = array_pop($relationPath);
        $relation = implode('.', $relationPath);
        $op = $mandatoryFilter['op'] ?? '=';
        $value = $mandatoryFilter['value'];

        if ($op === 'LIKE') {
            $value = "%$value%";
        }

        if ($relation) {
            $query->whereHas($relation, function ($q) use ($column, $op, $value) {
                $q->where($column, $op, $value);
            });
        } else {
            $query->where($column, $op, $value);
        }
    }

    // Apply other dynamic filters
    $query->where(function ($q) use ($combine, $filterList) {
        foreach ($filterList as $filter) {
            $relationPath = explode('.', $filter['key']);
            $column = array_pop($relationPath);
            $relation = implode('.', $relationPath);
            $op = $filter['op'] ?? '=';
            $value = $filter['value'] ?? null;

            if ($op === 'LIKE') {
                $value = "%$value%"; 
            }

            if ($relation) {
                $q->{$combine === 'or' ? 'orWhereHas' : 'whereHas'}($relation, function ($subQ) use ($column, $op, $value) {
                    $subQ->where($column, $op, $value);
                });
            } else {
                $q->{$combine === 'or' ? 'orWhere' : 'where'}($column, $op, $value);
            }
        }
    });

    Log::info('Final SQL', [
        'sql' => $query->toSql(),
        'bindings' => $query->getBindings()
    ]);

    return $query;
}


//new 


public function getAvailableFilters($pageSlug = null)
{
    return DB::table('filters')
        ->when(
            $pageSlug,
            fn($q) =>
            $q->whereJsonContains('applicable_pages', $pageSlug)
        )
        ->get()
        ->map(function ($filter) {
            $filter->options = json_decode($filter->options, true);
            $filter->applicable_pages = json_decode($filter->applicable_pages, true);
            return $filter;
        });
}





//     public function evaluateFilter($form, $filterKey, $input)
//     {
//         $function = $this->getFilterFunction($filterKey);

//         if ($function && method_exists($this, $function)) {
//             return $this->$function($form, $input);
//         }

//         return true;
//     }
//     protected function applyHasNestedRelationFilter($query, $relationPath, $field, $value, $exact = false)
// {
//     return $query->whereHas($relationPath, function ($q) use ($field, $value, $exact) {
//         if ($exact) {
//             $q->where($field, $value);
//         } else {
//             $q->where($field, 'LIKE', "%$value%");
//         }
//     });
// }


//     public function getFilterFunction($filterKey)
//     {
//         return DB::table('filters')
//             ->where('key_name', $filterKey)
//             ->value('function_name');
//     }



//     protected function applyFilterByStudentName($query, $input)
// {
//     return $query->whereHas('student.user', function ($q) use ($input) {
//         $q->whereRaw("CONCAT(first_name, ' ', last_name) LIKE ?", ["%$input%"]);
//     });
// }

// protected function applyFilterByStudentEmail($query, $input)
// {
//     return $query->whereHas('student.user', function ($q) use ($input) {
//         $q->where('email', 'LIKE', "%$input%");
//     });
// }

    
//     protected function applyFilterByStudentSupervisor($query, $input)
//     {
//         return $query->whereHas(
//             'student',
//             fn($q) =>
//             $q->where('supervisor', 'LIKE', '%' . $input . '%')
//         );
//     }
//     protected function applyFilterByStudentStatus($query, $input)
//     {
//         return $query->whereHas(
//             'student',
//             fn($q) =>
//             $q->where('status', 'LIKE', '%' . $input . '%')
//         );
//     }
//     public function formScopeHasSubmittedForm($query, $formType)
//     {
//         return $query->whereHas('student.forms', function ($q) use ($formType) {
//             $q->where('stage', $formType); // or 'type' if that's your column
//         });
//     }

//     public function formScopeHasNotSubmittedForm($query, $formType)
//     {
//         return $query->whereDoesntHave('student.forms', function ($q) use ($formType) {
//             $q->where('stage', $formType); // or 'type' if applicable
//         });
//     }
}
