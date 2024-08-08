<?php

namespace App\Http\Controllers;

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
        $authors = $request->authors;
        
        $publication->title=$request->title;
        $publication->date_filed=$request->date_filed;
        $publication->year_filed=$request->year_filed;
        $publication->status=$request->status;
        $type=$request->type;
        switch($type){
            case 'journal':
                $publication->journal_name=$request->journal_name;
                $publication->volume=$request->volume;
                $publication->page_no=$request->page_no;
                $publication->date_of_publication=$request->date_of_publication;
                $publication->year_of_publication=$request->year_of_publication;
                if($request->journal_type=='sci'){
                    $publication->impact_factor=$request->impact_factor;
                }
                // $publication->impact_factor=$request->impact_factor;
                $publication->journal_type=$request->journal_type;
                break;
            case 'conference':
                $publication->conference_name=$request->conference_name;
                $publication->conference_location=$request->conference_location;
                $publication->date_of_publication=$request->date_of_publication;
                $publication->year_of_publication=$request->year_of_publication;
                $publication->conference_type=$request->conference_type;
                break;
            case 'book':
                $publication->book_name=$request->book_name;
                $publication->publisher=$request->publisher;
                $publication->date_of_publication=$request->date_of_publication;
                $publication->year_of_publication=$request->year_of_publication;
                break;
        }
        $publication->save();
        foreach ($authors as $author) {
            $publication->addAuthor($author['name'], $author['user_id'] ?? null);
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

    public function update(Request $request)
{
    // Validation rules
    $validator = Validator::make($request->all(), [
        'title' => 'required|string|max:255',
        'author' => 'required|string|max:255',
        'published_at' => 'nullable|date',
        'id' => 'required|integer'
    ]);
    $id=$request->id;

    // Check authorization
    $user = Auth::user();
    $role = $user->role;
    if ($role != 'student') {
        return response()->json(['message' => 'You are not authorized to access this resource'], 403);
    }
  
    // Check validation
    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 400);
    }

    // Find existing publication
    $publication = Publication::find($id);
    if (!$publication) {
        return response()->json(['message' => 'Publication not found'], 404);
    }
    if($publication->student_id!=$user->student->roll_no){
        return response()->json(['message' => 'You are not authorized to access this resource'], 403);
    }

    $publication->title = $request->title;
    $authors = $request->author;
    $publication->authors()->delete();
    foreach ($authors as $author) {
        $publication->addAuthor($author['name'], $author['user_id'] ?? null);
    }
    $publication->title = $request->title;
    $publication->date_filed = $request->date_filed;
    $publication->year_filed = $request->year_filed;
    $publication->status = $request->status;
    $type = $request->type;
    
    switch ($type) {
        case 'journal':
            $publication->journal_name = $request->journal_name;
            $publication->volume = $request->volume;
            $publication->page_no = $request->page_no;
            $publication->date_of_publication = $request->date_of_publication;
            $publication->year_of_publication = $request->year_of_publication;
            if ($request->journal_type == 'sci') {
                $publication->impact_factor = $request->impact_factor;
            }
            $publication->journal_type = $request->journal_type;
            break;
        case 'conference':
            $publication->conference_name = $request->conference_name;
            $publication->conference_location = $request->conference_location;
            $publication->date_of_publication = $request->date_of_publication;
            $publication->year_of_publication = $request->year_of_publication;
            $publication->conference_type = $request->conference_type;
            break;
        case 'book':
            $publication->book_name = $request->book_name;
            $publication->publisher = $request->publisher;
            $publication->date_of_publication = $request->date_of_publication;
            $publication->year_of_publication = $request->year_of_publication;
            break;
    }

    // Save updated publication
    $publication->save();

    return response()->json($publication, 200);
}

   
}
