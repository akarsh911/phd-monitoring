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
        Schema::create('student_semester_offs', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->integer('semester_off_id')->unsigned()->index()->nullable();
            $table->foreign('semester_off_id')->references('id')->on('student_semester_off_forms')->onDelete('cascade');
            $table->integer('student_id')->unsigned()->index();
            $table->foreign('student_id')->references('roll_no')->on('students')->onDelete('cascade');
            $table->text('semester_off_required')->nullable();
            $table->text('proof_pdf')->nullable();
            $table->text('reason');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_semester_offs');
    }
};
