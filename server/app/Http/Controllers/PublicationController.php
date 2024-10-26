<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Traits\SaveFile;
use App\Models\Publication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class PublicationController extends Controller
{
    /**
     * Display a listing of the publications.
     *
     * @return \Illuminate\Http\Response
     */
    use SaveFile;
    public function index()
    {
        $publications = Publication::all();
        return response()->json($publications);
    }

    /**
     * Store a newly created publication in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'publication_type' => ['required', 'in:journal,conference,book'],
            'authors'=>'required|string',
            'status'=>'required|in:published,accepted',
            'doi_link'=>'required|string',
            'first_page'=>'required|file|mimes:pdf|max:2048',
            'year'=>'required|string',
            'name'=>'required|string'
        ]);
        $user = Auth::user();
        $role = $user->role->role;
        if($role!='student'){
            return response()->json(['message' => 'You are not authorized to access this resource'], 403);
        }
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $publication = new Publication();
        $publication->student_id = $user->student->roll_no;

        $publication->title = $request->title;
        $publication->authors = $request->authors;
        $publication->doi_link=$request->doi_link;
        $publication->year=$request->year;
        $publication->name=$request->name;
        
        $link=$this->saveUploadedFile($request->first_page,'publication'.$request->title,$user->student->roll_no);
        $publication->first_page=$link;
        $publication->status=$request->status;

        $type=$request->publication_type;
        switch($type){
            case 'journal':
                $request->validate(
                    [
                        'impact_factor' => 'required|numeric',
                        'type'=>'required|in:sci,non-sci',
                        'volume'=>'required|integer',
                        'page_no'=>'required|integer',
                    ]
                );
                $publication->volume=$request->volume;
                $publication->page_no=$request->page_no;
                $publication->impact_factor=$request->impact_factor;
                $publication->type=$request->type;
                break;
            case 'conference':
                $request->validate(
                    [
                        'country'=>'required|string',
                        'state'=>'required|string',
                        'city'=>'required|string',
                        'type'=>'required|in:national,international'
                    ]
                );
    
                $publication->country=$request->country;
                $publication->state=$request->state;
                $publication->city=$request->city;
                $publication->type=$request->type;
                break;
            case 'book':
                $request->validate(
                    [
                        'issn'=>'required|integer',
                        'volume'=>'required|integer',
                        'page_no'=>'required|integer',
                        'publisher'=>'required|string',
                    ]
                );

                $publication->issn=$request->issn;
                $publication->volume=$request->volume;
                $publication->page_no=$request->page_no;
                $publication->publisher=$request->publisher;
                break;
        }
        $publication->save();
        return response()->json($publication, 201);
    }

    /**
     * Display the specified publication.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $publication = Publication::find($id);

        if (!$publication) {
            return response()->json(['error' => 'Publication not found'], 404);
        }

        return response()->json($publication);
    }

    /**
     * Update the specified publication in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //coming soon
        //TODO: Implement update method
    }

   
}
