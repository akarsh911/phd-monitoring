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
        Schema::create('publication_authors', function (Blueprint $table) {
            $table->increments('id');
            $table->primary('id');
            $table->integer('publication_id')->unsigned()->index();
            $table->foreign('publication_id')->references('id')->on('publications')->onDelete('cascade');
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
        Schema::dropIfExists('publication_authors');
    }
};
