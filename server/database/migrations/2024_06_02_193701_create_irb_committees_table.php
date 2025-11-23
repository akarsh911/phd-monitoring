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
        Schema::create('irb_committees', function (Blueprint $table) {
            $table->increments('id');
    
            $table->integer('student_id')->unsigned()->index();
            $table->foreign('student_id')->references('roll_no')->on('students')->onDelete('cascade');
    
            $table->enum('type', ['inside', 'outside'])->default('outside');
    
            // Polymorphic columns
            $table->unsignedInteger('member_id');
            $table->string('member_type'); // Either "faculty" or "outside_experts"
    
            $table->timestamps();
    
            // Enforce one unique combination per student
            $table->unique(['student_id', 'member_id', 'member_type']);
        });
    }
    

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('irb_committees');
    }
};
