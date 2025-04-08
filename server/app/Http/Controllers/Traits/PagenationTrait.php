<?php

namespace App\Http\Controllers\Traits;


trait PagenationTrait
{

    public function applyPagination($query, $page, $perPage = 50)
    {
        $offset = ($page - 1) * $perPage;
    
        if (is_array($query)) {
            return array_slice($query, $offset, $perPage);
        } 
        
        if ($query instanceof \Illuminate\Database\Eloquent\Builder || $query instanceof \Illuminate\Database\Query\Builder) {
            return $query->skip($offset)->take($perPage);
        } 
    
        if ($query instanceof \Illuminate\Support\Collection) {
            return $query->slice($offset, $perPage);
        }
    
        throw new \Exception("Unsupported query type provided to applyPagination()");
    }
}
