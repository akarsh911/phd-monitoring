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
        Schema::create('supervisor_doctoral_changes', function (Blueprint $table) {
            $table->id();
            $table->integer('student_id')->unsigned()->index();
            $table->foreign('student_id')->references('roll_no')->on('students')->onDelete('cascade');
            $table->enum('change_type', ['add', 'remove', 'replace']);
            $table->enum('member_type', ['supervisor', 'doctoral']); // supervisor or doctoral committee
            $table->enum('faculty_type', ['internal', 'external'])->default('internal');

            // For remove/replace: existing member to be removed
            $table->string('old_faculty_code')->nullable();

            // For add/replace: new member to be added
            $table->string('new_faculty_code')->nullable();

            // For external members not in faculty table
            $table->integer('outside_expert_id')->nullable();

            $table->text('reason')->nullable();
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');

            // Who requested and approved


            $table->timestamp('approved_at')->nullable();

            $table->text('rejection_reason')->nullable();

            $table->timestamps();
            $table->unsignedInteger('requested_by');
            $table->unsignedInteger('approved_by')->nullable();

            $table->foreign('requested_by')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('approved_by')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('supervisor_doctoral_changes');
    }
};
