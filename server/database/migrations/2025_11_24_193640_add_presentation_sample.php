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
        //
        Schema::table('semesters', function (Blueprint $table) {
            $table->text('ppt_file')->nullable()->nullable();
        });
         Schema::table('presentations', function (Blueprint $table) {
            $table->text('ppt_file')->nullable()->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
