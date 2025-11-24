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
            $table->timestamps();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('designation');
            $table->string('institution');
            $table->string('department');
            $table->string('email')->unique();
            $table->string('phone')->nullable()->unique();
            $table->text('area_of_expertise')->nullable();
            $table->string('website')->nullable();
        });
        Schema::table('constitute_of_irb', function (Blueprint $table) {
            $table->integer('outside_expert')->unsigned()->index()->nullable();;
            $table->foreign('outside_expert')->references('id')->on('outside_experts')->onDelete('cascade');
        });
        Schema::table('irb_outside_experts',function (Blueprint $table){
            $table->integer('expert_id')->unsigned()->index();
            $table->foreign('expert_id')->references('id')->on('outside_experts')->onDelete('cascade');
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
