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
        Schema::table('constitute_of_irb', function (Blueprint $table) {
            $table->text('broad_area_of_research')->nullable()->after('irb_pdf');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('constitute_of_irb', function (Blueprint $table) {
            $table->dropColumn('broad_area_of_research');
        });
    }
};
