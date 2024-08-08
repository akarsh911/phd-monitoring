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
        Schema::create('irb_sub_forms', function (Blueprint $table) {
            $table->increments('id');
            $table->primary('id');
            $table->integer('student_id')->unsigned()->index();
            $table->foreign('student_id')->references('roll_no')->on('students')->onDelete('cascade');
            $table->enum('status',['awaited','approved','rejected']);
            $table->enum('stage',['student','supervisor','phd_coordinator','hod']);
            $table->text('student_comments');
            $table->text('supervisor_comments');
            $table->text('phd_coordinator_comments');
            $table->text('hod_comments');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('irb_sub_forms');
    }
};
