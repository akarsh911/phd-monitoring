<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();

Artisan::command('setup', function () {
    // $this->call('migrate');
    // $this->comment("Migrated tables");
    // $role = new \App\Models\Role();
    // $role->role = 'Admin';
    // $role->setAllTrue();
    // $role->save();
    // $this->comment("Admin role created");
    $user= new \App\Models\User();
    $user->first_name = 'Admin';
    $user->last_name = 'Admin';
    $user->phone = '1234567890';
    $user->email = 'admin@gmail.com';
    $user->password = bcrypt('Password@123');
    $user->role_id = 1;
    $user->save();
    $this->comment("Admin user created Username:admin@example.com Password:Password@123");
    $this->call('serve');
});