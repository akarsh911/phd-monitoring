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
        Schema::create('list_of_examiners_forms', function (Blueprint $table) {
            $table->increments('id');
            $table->primary('id');
            $table->integer('student_id')->unsigned()->index();
            $table->foreign('student_id')->references('roll_no')->on('students')->onDelete('cascade');
            $table->integer('supervisor_id')->unsigned()->index();
            $table->foreign('supervisor_id')->references('faculty_code')->on('faculty')->onDelete('cascade');
            $table->enum('status',['awaited','approved','rejected'])->default('awaited');
            $table->enum('stage',['supervisor','dordc','director'])->default('supervisor');
            $table->enum('dordc_approval',['approved','rejected','awaited'])->nullable();
            $table->enum('director_approval',['approved','rejected','awaited'])->nullable();
            $table->boolean('supervisor_lock')->default(true);
            $table->boolean('dordc_lock')->default(true);
            $table->boolean('director_lock')->default(true);
            $table->text('SuperVisorComments')->nullable();
            $table->text('DORDCComments')->nullable();
            $table->text('DirectorComments')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('list_of_examiners_forms');
    }
};
