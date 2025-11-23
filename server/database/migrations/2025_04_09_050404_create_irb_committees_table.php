<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIrbCommitteesTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('irb_committees', function (Blueprint $table) {
            $table->id();

            $table->integer('student_id')->unsigned()->index();
            $table->foreign('student_id')->references('roll_no')->on('students')->onDelete('cascade');
            $table->string('type'); // 'inside' or 'outside'
            $table->integer('member_id');
            $table->string('member_type'); // for morphTo relation (Faculty::class or OutsideExpert::class)

            $table->timestamps();

            // Assuming 'roll_no' is the primary key in students table
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('irb_committees');
    }
}
