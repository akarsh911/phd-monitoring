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
        Schema::create('irb_sub_form_histories', function (Blueprint $table) {
            $table->increments('id');
            $table->primary('id');
            $table->integer('sub_form_id')->unsigned()->index();
            $table->foreign('sub_form_id')->references('id')->on('irb_sub_forms')->onDelete('cascade');
            $table->enum('status',['awaited','approved','rejected']);
            $table->enum('stage',['student','supervisor','phd_coordinator','hod']);
            $table->text('comments');
            $table->integer('user_id')->unsigned()->index();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('irb_sub_form_histories');
    }
};
