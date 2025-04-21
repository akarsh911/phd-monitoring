<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\DepartmentController;
use App\Models\Approval;

Route::get('/{key}', function ($key, Request $request) {
    $approval = Approval::where('key', $key)->first();

    $action = $request->query('action');
    if (!$approval) {
        return response()->json(['message' => 'Invalid approval key.'], 404);
    }
    if ($action === 'accept') {
        $approval->approved = true;
    } elseif ($action === 'reject') {
        $approval->approved = false;
    }
    $approval->save();

    $model = $approval->model_type;


    $modelInstance = new $model;  // This will create an instance of IrbSubForm

    if (method_exists($modelInstance, 'handleApproval')) {
        // echo "Model: $model\n";
       return $modelInstance->handleApproval($approval->email, $approval->model_id, $approval->approved);
    } else {
        echo "The method 'externalApproval' does not exist in model: $model";
        return response()->json(['message' => "The method 'externalApproval' does not exist in model: $model"], 500);
    }


    // return response()->json(['message' => "Action '{$action}' completed."]);
});
