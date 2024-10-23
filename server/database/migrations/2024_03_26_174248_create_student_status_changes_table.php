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
        Schema::create('student_status_changes', function (Blueprint $table) {
            $table->id();
            $table->integer('student_id')->unsigned()->index();
            $table->foreign('student_id')->references('roll_no')->on('students')->onDelete('cascade');
            $table->enum('type_of_change', ['full-time to part-time', 'part-time to full-time'])->nullable();
            $table->text('reason');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_status_changes');
    }
};
