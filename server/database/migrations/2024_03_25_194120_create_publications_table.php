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
        Schema::create('publications', function (Blueprint $table) {
            $table->increments('id');
            $table->primary('id');
            $table->integer('student_id')->unsigned()->index();
            $table->foreign('student_id')->references('id')->on('students')->onDelete('cascade');

            $table->text('title')->nullable();
            $table->text('author')->nullable();
            $table->text('co_author')->nullable();


            $table->text('journal_name')->nullable();
            $table->text('book_name')->nullable();
            $table->text('conference_name')->nullable();
            $table->string('conference_location')->nullable();
            $table->text('publisher')->nullable();
            $table->integer('volume')->nullable();
            $table->integer('page_no')->nullable();
    
            

            $table->enum('type', ['journal', 'conference', 'book'])->default('journal');
            $table->enum('status', ['published', 'accepted', 'submitted'])->default('submitted');
            $table->enum('conference_type', ['national', 'international',''])->default('')->nullable();
            $table->enum('journal_type', ['sci', 'non-sci',''])->default('')->nullable();
          

            $table->date('date_filed');
            $table->integer('year_filed');
            $table->date('date_of_publication');
            $table->integer('year_of_publication');
            $table->float('impact_factor');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('publications');
    }
};
