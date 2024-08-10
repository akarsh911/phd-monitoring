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
        Schema::create('research_extentions', function (Blueprint $table) {
            $table->increments('id');
            $table->primary('id');
            $table->integer('research_extentions_id')->unsigned()->index()->nullable();
            $table->foreign('research_extentions_id')->references('id')->on('research_extentions_form')->onDelete('cascade');
            $table->integer('student_id')->unsigned()->index();
            $table->foreign('student_id')->references('roll_no')->on('students')->onDelete('cascade');
            $table->text('start')->nullable();
            $table->text('end')->nullable();
            $table->integer('period_of_extension')->unsigned();
            $table->String('reason');
           });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('research_extentions');
    }
};
