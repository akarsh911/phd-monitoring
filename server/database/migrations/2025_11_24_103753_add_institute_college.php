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
         Schema::table('faculty', function (Blueprint $table) {
            $table->enum('type', ['internal', 'external'])->default('internal');
            $table->text('institution')->nullable()->default('Thapar Institute of Engineering and Technology');
            $table->text('website_link')->nullable();
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
