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
        Schema::create('supervisor_change_form_updated_supervisors', function (Blueprint $table) {
            $table->increments('id');
            $table->primary('id');
            $table->integer('form_id')->unsigned()->index();
            $table->foreign('form_id', 'fk_form_id')->references('id')->on('supervisor_change_forms')->onDelete('cascade');
            $table->integer('old_supervisor_id')->unsigned()->index('old_supervisor_id_index');
            $table->foreign('old_supervisor_id','fk_sp_id')->references('faculty_code')->on('faculty')->onDelete('cascade');
            $table->integer('new_supervisor_id')->unsigned()->nullable()->index('new_supervisor_id_index');
            $table->foreign('new_supervisor_id','fk_nsp_id')->references('faculty_code')->on('faculty')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('supervisor_change_form_updated_supervisors');
    }
};
