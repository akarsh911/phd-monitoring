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
        Schema::create('irb_sub_objectives', function (Blueprint $table) {
            $table->increments('id');
            $table->primary('id');
            $table->integer('irb_form_id')->unsigned()->index();
            $table->foreign('irb_form_id')->references('id')->on('irb_sub_forms')->onDelete('cascade');
            $table->string('objective');
            $table->enum('type',['draft','revised']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('irb_sub_objectives');
    }
};
