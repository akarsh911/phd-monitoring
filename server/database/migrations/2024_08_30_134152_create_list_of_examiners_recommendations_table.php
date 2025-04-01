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
        Schema::create('list_of_examiners_recommendations', function (Blueprint $table) {
            $table->increments('id');
            $table->primary('id');
            $table->timestamps();
            $table->integer('form_id')->unsigned()->index();
            $table->foreign('form_id')->references('id')->on('list_of_examiners_forms')->onDelete('cascade');
            $table->integer('examiner_id')->unsigned()->index();
            $table->foreign('examiner_id')->references('id')->on('examiners_details')->onDelete('cascade');
            $table->enum('recommendation',['approved','rejected','awaited'])->default('awaited');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('list_of_examiners_recommendations');
    }
};
