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
        Schema::create('students', function (Blueprint $table) {
            $table->integer('roll_no')->unique()->unsigned();
            $table->primary('roll_no');
            $table->integer('user_id')->unsigned()->index();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->unique('user_id');
            $table->integer('department_id')->unsigned()->nullable();
            $table->date('date_of_registration');
            $table->date('date_of_irb');
            $table->date('date_of_synopsis');
            $table->text('phd_title');
            $table->text('fathers_name');
            $table->text('address');
            $table->enum('current_status',['part-time','full-time']);
            $table->float('overall_progress');
            $table->float('cgpa');
            $table->timestamps();
        });
     
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
