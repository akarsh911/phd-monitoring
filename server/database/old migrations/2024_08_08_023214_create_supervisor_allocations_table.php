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
        Schema::create('supervisor_allocations', function (Blueprint $table) {
            $table->increments('id');
            $table->primary('id');
            $table->integer('student_id')->unsigned()->index();
            $table->foreign('student_id')->references('roll_no')->on('students')->onDelete('cascade');
            $table->enum('status',['awaited','approved','rejected']);
            $table->enum('stage',['student','hod']);
            $table->date('requires_period');
            $table->text('reason')->nullable();
            $table->enum('hod_approval',['approved','rejected'])->nullable();
            $table->boolean('student_lock')->default(false); 
            $table->text('HODComments')->nullable();
           
            $table->text('prefrence1')->nullable(); 
            $table->foreign('prefrence1')->references('faculty_code')->on('faculty')->onDelete('cascade');;
       
            $table->text('prefrence2')->nullable();
            $table->foreign('prefrence2')->references('faculty_code')->on('faculty')->onDelete('cascade');;
       
            $table->text('prefrence3')->nullable();
            $table->foreign('prefrence3')->references('faculty_code')->on('faculty')->onDelete('cascade');;
       
            $table->text('prefrence4')->nullable();
            $table->foreign('prefrence4')->references('faculty_code')->on('faculty')->onDelete('cascade');;
       
            $table->text('prefrence5')->nullable();
            $table->foreign('prefrence5')->references('faculty_code')->on('faculty')->onDelete('cascade');;
       

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('supervisor_allocations');
    }
};
