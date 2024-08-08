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
        Schema::create('irb_expert_chairmen', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('irb_form_id')->unsigned();
            $table->foreign('irb_form_id')->references('id')->on('irb_forms')->onDelete('cascade');
            $table->integer('expert_id')->unsigned();
            $table->foreign('expert_id')->references('faculty_code')->on('faculty')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('irb_expert_chairmen');
    }
};
