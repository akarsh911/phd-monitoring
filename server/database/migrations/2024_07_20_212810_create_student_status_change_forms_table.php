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
        Schema::create('student_status_change_forms', function (Blueprint $table) {
            $table->increments('id');
            $table->primary('id');
            $table->unsignedInteger('student_id');
            $table->foreign('student_id')->references('roll_no')->on('students')->onDelete('cascade');
            $table->enum('status',['awaited','approved','rejected']);
            $table->enum('stage',['student','supervisor','hod','dordc','dra','director','completed']);
            $table->text('reason')->nullable();
            $table->enum('supervisor_approval',['approved','rejected'])->nullable();
            $table->enum('hod_approval',['approved','rejected'])->nullable();
            $table->enum('dra_approval',['approved','rejected'])->nullable();
            $table->enum('dordc_approval',['approved','rejected'])->nullable();
            $table->enum('director_approval',['approved','rejected'])->nullable();
            $table->boolean('student_lock')->default(false); 
            $table->boolean('supervisor_lock')->default(true);
            $table->boolean('hod_lock')->default(true);
            $table->boolean('dordc_lock')->default(true);
            $table->boolean('dra_lock')->default(true);
            $table->boolean('director_lock')->default(true);
            $table->text('SupervisorComments')->nullable();
            $table->text('HODComments')->nullable();
            $table->text('DORDCComments')->nullable();
            $table->text('DRAComments')->nullable();
            $table->text('DirectorComments')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_status_change_forms');
    }
};
