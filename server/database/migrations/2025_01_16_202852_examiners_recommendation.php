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
        Schema::create('examiners_recommendation', function (Blueprint $table) {
            $table->id();
            $table->integer('form_id')->unsigned()->index();
            $table->foreign('form_id')->references('id')->on('list_of_examiners')->onDelete('cascade');
            $table->string('name');
            $table->string('email');
            $table->string('institution');
            $table->string('designation');
            $table->string('department');
            $table->string('phone');   
            $table->integer('faculty_id')->unsigned()->index();
            $table->foreign('faculty_id')->references('faculty_code')->on('faculty')->onDelete('cascade');
            $table->enum('recommendation',['approved','rejected','pending'])->default('pending');
            $table->enum('type',['national','international'])->default('national');
            $table->string('comment')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
