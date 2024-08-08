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
        Schema::create('research_extentions_approvals', function (Blueprint $table) {
            $table->id();
            $table->integer('research_extentions_id')->unsigned()->index()->nullable();
            $table->foreign('research_extentions_id')->references('id')->on('research_extentions_form')->onDelete('cascade');
            $table->integer('supervisor_id')->unsigned()->index();
            $table->foreign('supervisor_id')->references('faculty_code')->on('faculty')->onDelete('cascade');
            $table->enum('status',['awaited','approved','rejected'])->default('awaited');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('research_extentions_approvals');
    }
};
