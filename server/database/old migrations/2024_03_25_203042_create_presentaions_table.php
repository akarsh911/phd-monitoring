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
        Schema::create('presentations', function (Blueprint $table) {
            $table->increments('id');
            $table->primary('id');
            $table->integer('student_id')->unsigned()->index();
            $table->foreign('student_id')->references('roll_no')->on('students')->onDelete('cascade');
            $table->date('date')->nullable();
            $table->string('time')->nullable();
            $table->string('period_of_report')->nullable();
            $table->enum('teaching_work',['UG','PG','Both','None'])->default('None');
            $table->enum('status', ['scheduled','under review','evaluated']);
            $table->enum('locked', ['yes','no'])->default('no');
            $table->integer('progress')->nullable();
            $table->enum('overall_progress', ['satisfactory','not satisfactory']);
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
        Schema::dropIfExists('presentations');
    }
};
