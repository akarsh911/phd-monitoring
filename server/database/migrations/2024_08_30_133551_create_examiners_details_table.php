<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('examiners_details', function (Blueprint $table) {
            $table->increments('id')->index();
            
            $table->timestamps();
            $table->text('name');
            $table->text('designation');
            $table->text('department');
            $table->text('email');
            $table->text('phone');
            $table->text('university');
            $table->text('country');
            $table->text('city');
          
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('examiners_details');
    }
};
