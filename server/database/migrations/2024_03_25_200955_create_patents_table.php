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

            $table->integer('student_id')->unsigned()->index();
            $table->foreign('student_id')->references('roll_no')->on('students')->onDelete('cascade');
            $table->integer('form_id')->unsigned()->nullable();
            $table->enum('form_type', ['progress', 'thesis','synopsis'])->nullable();

            $table->text('title')->nullable();
            $table->string('patent_number')->nullable();
            $table->string('first_page')->nullable();
            $table->text('authors')->nullable();
            $table->year('year')->nullable();
            $table->text('doi_link')->nullable();
            $table->enum('status', ['filed', 'published', 'granted']);
            $table->enum('country',['National','International'])->default('National')->nullable();
          
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
