<?php

namespace App\Http\Controllers\Traits;

use App\Models\Forms;

trait GeneralFormCreate
{
    use GeneralFormSubmitter;
    private function createForms($model, $data,callable $callback = null)
    {
        try{
        $form = new $model(
            [
                'student_id' => $data['roll_no'],
                'status' => 'draft',
                'stage' => $data['role'],
                'student_lock' => false,
                'steps'=>$data['steps']
            ]
        );
        $generalForm= Forms::where('form_type',$this->getFormType($model))->where('student_id',$data['roll_no'])->first();
        $field=$data['role'].'_available';
        if(!$generalForm||$generalForm->$field== false){
            return response()->json(['message' => 'Form is not available for you'], 400);
        }
        if($generalForm->count==$generalForm->max_count){
            return response()->json(['message' => 'You have reached the maximum limit of forms of this type'], 400);
        }

        $oldForms = $model::where('student_id', $data['roll_no'])->get();

        foreach($oldForms as $oldForm){
            if($oldForm->completion!='complete'){
                return response()->json(['message' => 'You have a pending form'], 400);
            }
        }


        if($callback){
            $callback($form);
        }

        if(isset($data['data']))
            $form->fill($data['data']);

        $form->addHistoryEntry("Form has been initiated", $data['name']);
        $form->save();
        $generalForm->count++;
        $generalForm->save();
        return response()->json(['message' => 'Form Created'], 200);
      }
       catch (\Exception $e) {
        if($e->getCode()==201){
            return response()->json(['message' => $e->getMessage()], 201);
        }
        return response()->json(['message' => $e->getMessage()], 403);
    }
    }
    
}