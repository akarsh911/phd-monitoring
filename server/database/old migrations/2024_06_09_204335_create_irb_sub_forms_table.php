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
            $table->enum('form_type',['draft','revised'])->default('draft');
            $table->text('phd_title')->nullable();
            $table->text('revised_phd_title')->nullable();
            $table->text('irb_pdf')->nullable();
            $table->text('revised_irb_pdf')->nullable();
            $table->text('date_of_irb')->nullable();
            $table->enum('status',['awaited','approved','rejected'])->default('awaited');
            $table->enum('stage',['student','supervisor','phd_coordinator','hod','dordc','dra'])->default('student');
            $table->enum('supervisor_approval',['approved','rejected','awaited'])->nullable();
            $table->enum('hod_approval',['approved','rejected','awaited'])->nullable();
            $table->enum('phd_coordinator_approval',['approved','rejected','awaited'])->nullable();
            $table->enum('dra_approval',['approved','rejected','awaited'])->nullable();
            $table->enum('dordc_approval',['approved','rejected','awaited'])->nullable();
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
        Schema::dropIfExists('irb_sub_forms');
    }
};
