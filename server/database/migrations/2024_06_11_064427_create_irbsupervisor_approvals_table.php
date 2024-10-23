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
        Schema::create('irb_supervisor_approvals', function (Blueprint $table) {
            $table->increments('id');
            $table->primary('id');
            $table->integer('irb_sub_form_id')->unsigned()->index();
            $table->foreign('irb_sub_form_id')->references('id')->on('irb_sub_forms')->onDelete('cascade');
            $table->integer('supervisor_id')->unsigned()->index();
            $table->foreign('supervisor_id')->references('faculty_code')->on('faculty')->onDelete('cascade');
            $table->enum('status',['awaited','approved','rejected']);
            $table->unique(['irb_sub_form_id','supervisor_id'],'uiniqe_approval');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('irbsupervisor_approvals');
    }
};
