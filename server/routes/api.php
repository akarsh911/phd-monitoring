<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Models\Role;
use Illuminate\Support\Facades\App;
use App\Models\User;
use App\Models\Department;
use App\Models\Faculty;
use App\Models\Student;
Route::get('/user', function (Request $request) {
    
    $user= \App\Models\User::all();

    return response()->json(
        [
            'users'=>$user
        ],200
    );
})->middleware('auth:sanctum');

Route::post('/login',function (Request $request){

    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);
    if (Auth::attempt($request->only('email','password'))){
      /** @var \App\Models\MyUserModel $user **/
        $user = Auth::user();
        $user->role = Role::find(Auth::user()->role_id);
        
        $token = $user->createToken('auth_token', ['server:access'],now()->addDays(10))->plainTextToken;
            // ->withTtl(now()->addMinute())
            // ->plainTextToken
           ;
        return response()->json([
            "user" => $user,
            "token" => $token
        ],200);
    }
    return response()->json([
        'error' => 'Invalid Credentials'
    ],401);
});


Route::post('/login/google/callback',function(Request $request){
    $request->validate([
        'email' => 'required|email',
        'first_name' => 'required|string',
        'last_name' => 'required|string',
        'phone' => 'required|string']);
        
    $user = User::where('email',$request->email)->first();
    if (!$user){
        $user = new User();
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->phone = $request->phone;
        $user->email = $request->email;
        $user->password = bcrypt('password');
        $user->role_id = 1;
        $user->save();
    }
    $user->role = Role::find($user->role_id);
    $token = $user->createToken('auth_token
    ', ['server:access'],now()->addDays(1))->plainTextToken;
    return response()->json([
        "user" => $user,
        "token" => $token
    ],200);
});
Route::post('register',function (Request $request){
    $request->validate([
        'first_name' => 'required|string',
        'last_name' => 'required|string',
        'phone' => 'required|string',
        'email' => 'required|email|unique:users',
        'password' => 'required|string',
        'gender' => 'required|string',
    ]);
    $user = new \App\Models\User();
    $user->first_name = $request->first_name;
    $user->last_name = $request->last_name;
    $user->phone = $request->phone;
    $user->email = $request->email;
    $user->password = bcrypt($request->password);
    $user->gender= $request->gender;
    $user->role_id=1;
    $user->save();
    return response()->json($user,200);
});

Route::post('create-role',function (Request $request){
    $request->validate([
        'role' => 'required|string',
    ]);
    $role = new \App\Models\Role();
    $role->role = 'Default';
    $role->save();
    return response()->json($role,200);
});
Route::prefix('roles')->group(function () {
    require base_path('routes/base/roles.php');
});

Route::prefix('departments')->group(function () {
    require base_path('routes/base/departments.php');
});


Route::prefix('publications')->group(function () {
    require base_path('routes/base/publications.php');
});

Route::prefix('patents')->group(function () {
    require base_path('routes/base/patents.php');
});

Route::prefix('faculties')->group(function () {
    require base_path('routes/base/faculties.php');
});

Route::prefix('students')->group(function () {
    require base_path('routes/base/students.php');
});

Route::prefix('supervisors')->group(function () {
    require base_path('routes/base/supervisors.php');
});

Route::prefix('external')->group(function () {
    require base_path('routes/base/external.php');
});

Route::prefix('forms')->group(function () {
    require base_path('routes/base/forms.php');
});


Route::prefix('presentation')->group(function () {
    require base_path('routes/base/presentation.php');
});

Route::prefix('suggestions')->group(function () {
    require base_path('routes/base/suggestions.php');
});




// Route::get('/init',function (){
    
//     User::factory()->count(10)->create();
//     Department::factory()->count(3)->create();
//     Role::factory()->count(5)->create();
//     Student::factory()->count(15)->create();
//     Faculty::factory()->count(8)->create();


// return response()->json([
//     'message' => 'Data initialized successfully'
// ], 200);
// });