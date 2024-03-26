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
        Schema::create('patents', function (Blueprint $table) {
            $table->increments('id');
            $table->primary('id');
            $table->text('title');
            $table->string('patent_number');
            $table->date('date_of_filing');
            $table->date('date_of_issue');
            $table->enum('status', ['pending', 'issued', 'rejected']);
            $table->text('description');
            $table->enum('country',['India','Others'])->default('India')->nullable();
            $table->integer('student_id')->unsigned()->index();
            $table->foreign('student_id')->references('id')->on('students')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patents');
    }
};
