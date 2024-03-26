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
            $table->foreign('student_id')->references('id')->on('students')->onDelete('cascade');
            $table->date('date');
            $table->string('time');
            $table->string('period_of_report');
            $table->enum('teaching_work',['UG','PG','Both','None'])->default('None');
            $table->enum('status', ['scheduled','under review','evaluated']);
            $table->enum('locked', ['yes','no'])->default('no');
            $table->float('progress');
            $table->enum('overall_progress', ['satisfactory','not satisfactory']);
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
