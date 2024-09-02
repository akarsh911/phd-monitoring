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
        Schema::table('irb_forms', function (Blueprint $table) {
            $table->string('semester')->nullable(); 
            $table->date('date_of_admission')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('irb_forms', function (Blueprint $table) {
            $table->dropColumn('semester'); // Remove the semester column
        });
    }
};
