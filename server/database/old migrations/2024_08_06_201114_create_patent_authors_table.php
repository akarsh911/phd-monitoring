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
        Schema::create('patent_authors', function (Blueprint $table) {
            $table->increments('id');
            $table->primary('id');
            $table->foreign('patent_id')->references('id')->on('patents')->onDelete('cascade');
            $table->integer('patent_id')->unsigned()->index();
            $table->text('name')->nullable();
            $table->integer('user_id')->unsigned()->index()->nullable();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patent_authors');
    }
};
