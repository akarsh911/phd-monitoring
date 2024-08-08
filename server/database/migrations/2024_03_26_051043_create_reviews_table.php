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
        Schema::create('presentation_reviews', function (Blueprint $table) {
            $table->increments('id');
            $table->primary('id');
            $table->integer('presentation_id')->unsigned()->index();
            $table->foreign('presentation_id')->references('id')->on('presentations')->onDelete('cascade');
            $table->integer('faculty_id')->unsigned()->index();
            $table->foreign('faculty_id')->references('faculty_code')->on('faculty')->onDelete('cascade');
            $table->enum('progress',['satifactory','not satisfactory']);
            $table->enum('is_supervisor',['yes','no']);
            $table->text('comments');
            $table->enum('review_status',['pending','completed']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('presentation_reviews');
    }
};
