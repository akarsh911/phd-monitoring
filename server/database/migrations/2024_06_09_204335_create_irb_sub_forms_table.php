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
            $table->enum('form_type',['draft','revised']);
            $table->text('phd_title');
            $table->text('revised_phd_title')->nullable();
            $table->text('irb_pdf');
            $table->text('revised_irb_pdf')->nullable();
            $table->text('date_of_irb');
            $table->enum('status',['awaited','approved','rejected'])->default('awaited');
            $table->enum('stage',['student','supervisor','phd_coordinator','hod'])->default('student');
            $table->text('student_comments')->nullable();
            $table->text('supervisor_comments')->nullable();
            $table->text('phd_coordinator_comments')->nullable();
            $table->text('hod_comments')->nullable();


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
