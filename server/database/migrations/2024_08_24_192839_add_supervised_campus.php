<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('faculty', function (Blueprint $table) {
            $table->integer('supervised_campus')->nullable()->default(0);
            $table->integer('supervised_outside')->nullable()->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('faculty', function (Blueprint $table) {
            $table->dropColumn('supervised_campus');
            $table->dropColumn('supervised_outside');
        });
    }
    
};

