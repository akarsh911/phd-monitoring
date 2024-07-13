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
        //
        Schema::create('research_extentions_form', function (Blueprint $table) {
            $table->increments('id');
            $table->primary('id');
            $table->integer('student_id')->unsigned()->index();
            $table->foreign('student_id')->references('roll_no')->on('students')->onDelete('cascade');
            $table->enum('status',['awaited','approved','rejected']);
            $table->enum('stage',['student','supervisor','hod','dordc','dra']);
            $table->text('start_date')->nullable();
            $table->text('end_date')->nullable();
            $table->text('reason')->nullable();
            $table->enum('hod_approval',['approved','rejected'])->nullable();
            $table->enum('dra_approval',['approved','rejected'])->nullable();
            $table->boolean('student_lock')->default(false); 
            $table->boolean('supervisor_lock')->default(true);
            $table->boolean('hod_lock')->default(true);
            $table->boolean('dordc_lock')->default(true);
            $table->boolean('dra_lock')->default(true);
            $table->text('SuperVisorComments')->nullable();
            $table->text('HODComments')->nullable();
            $table->text('DORDCComments')->nullable();
            $table->text('DRAComments')->nullable();
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
