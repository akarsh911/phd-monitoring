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
        Schema::create('synopsis_objectives', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->integer('synopsis_id')->unsigned()->index();
            $table->foreign('synopsis_id')->references('id')->on('synopsis_submissions')->onDelete('cascade');
            $table->string('objective');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('synopsis_objectives');
    }
};
