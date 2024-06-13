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
        Schema::create('outside_experts', function (Blueprint $table) {
            $table->increments('id');
            $table->primary('id');
            $table->timestamps();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('designation');
            $table->string('institution');
            $table->string('email');
            $table->string('phone')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('outside_experts');
    }
};
