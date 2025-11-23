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
        Schema::create('area_of_specializations', function (Blueprint $table) {
            $table->id();
            $table->integer('department_id')->unsigned()->nullable();
            $table->foreign('department_id')->references('id')->on('departments')->onDelete('cascade');
            $table->text('name')->nullable();
            $table->text('expert_name')->nullable();
            $table->text('expert_email')->nullable();
            $table->text('expert_phone')->nullable();
            $table->text('expert_college')->nullable();
            $table->text('expert_designation')->nullable();
            $table->text('expert_website')->nullable();
            $table->timestamps();
        });
        Schema::table('students', function (Blueprint $table) {
            $table->unsignedBigInteger('area_of_specialization_id')->nullable()->after('department_id');
            $table->foreign('area_of_specialization_id')
                ->references('id')
                ->on('area_of_specializations')
                ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('area_of_specializations');
    }
};
