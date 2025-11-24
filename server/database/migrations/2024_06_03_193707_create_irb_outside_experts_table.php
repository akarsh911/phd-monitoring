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
        Schema::create('irb_outside_experts', function (Blueprint $table) {
            $table->id();
            $table->integer('irb_form_id')->unsigned()->index();
            $table->foreign('irb_form_id')->references('id')->on('constitute_of_irb')->onDelete('cascade');
            // $table->int('hod_id')->unsigned()->index();
            // $table->foreign('hod_id')->references('hod_id')->on('departments')->onDelete('cascade')->onUpdate('update');
                $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('irb_outside_experts');
    }
};
