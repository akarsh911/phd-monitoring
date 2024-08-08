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
        Schema::create('doctoral_commitee', function (Blueprint $table) {
            $table->increments('id');
            $table->primary('id');
            $table->integer('faculty_id')->unsigned()->index();
            $table->foreign('faculty_id')->references('faculty_code')->on('faculty')->onDelete('cascade');
            $table->integer('student_id')->unsigned()->index();
            $table->foreign('student_id')->references('roll_no')->on('students')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('doctoral_commitee');
    }
};
