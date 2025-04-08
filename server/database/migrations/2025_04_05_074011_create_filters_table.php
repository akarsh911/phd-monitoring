<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFiltersTable extends Migration
{
    public function up()
    {
        Schema::create('filters', function (Blueprint $table) {
            $table->id();
            $table->string('key_name')->unique();       
            $table->string('label');                   
            $table->string('data_type');               
            $table->string('api_url')->nullable();  
            $table->json('options')->nullable();
            $table->string('operator')->default('=');
            $table->string('function_name');            
            $table->json('applicable_pages')->nullable();

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('filters');
    }
}
