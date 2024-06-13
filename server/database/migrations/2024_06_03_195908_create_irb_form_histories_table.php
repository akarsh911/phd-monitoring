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
        Schema::create('irb_form_histories', function (Blueprint $table) {
            $table->increments('id');
            $table->primary('id');
            $table->integer('irb_form_id')->unsigned()->index();
            $table->foreign('irb_form_id')->references('id')->on('irb_forms')->onDelete('cascade');
            $table->enum('stage',['student','supervisor','hod','dordc','dra']);
            $table->enum('status', ['approved', 'rejected', 'awaited'])->default('awaited');
            $table->integer('user_id')->unsigned()->index();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->text('change');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('irb_form_histories');
    }
};
