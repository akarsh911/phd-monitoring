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
        Schema::create('irb_nominee_cognates', function (Blueprint $table) {
            $table->increments('id');
            $table->primary('id');
            $table->integer('irb_form_id')->unsigned();
            $table->foreign('irb_form_id')->references('id')->on('constitute_of_irb')->onDelete('cascade');
            $table->integer('supervisor_id')->unsigned()->index()->nullable();
            $table->foreign('supervisor_id')->references('faculty_code')->on('faculty')->onDelete('set null');
            $table->integer('nominee_id')->unsigned()->index();
            $table->foreign('nominee_id')->references('faculty_code')->on('faculty')->onDelete('cascade');
            $table->enum('status',['awaited','approved','rejected']);
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('irb_nominee_cognates');
    }
};
