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
        Schema::create('table_permissions', function (Blueprint $table) {
            $table->increments('id');
            $table->primary('id');
            $table->string('role')->unique();
            $table->enum('can_read_all_students',['true','false'])->default('false');
            $table->enum('can_read_all_faculties',['true','false'])->default('false');
            $table->enum('can_read_supervised_students',['true','false'])->default('false');
            $table->enum('can_read_department_students',['true','false'])->default('false');
            $table->enum('can_read_department_faculties',['true','false'])->default('false');
            $table->enum('can_edit_all_students',['true','false'])->default('false');
            $table->enum('can_edit_all_faculties',['true','false'])->default('false');
            $table->enum('can_edit_department_students',['true','false'])->default('false');
            $table->enum('can_edit_department_faculties',['true','false'])->default('false');
            $table->enum('can_edit_own_profile',['true','false'])->default('false');
            $table->enum('can_edit_phd_title',['true','false'])->default('false');
            $table->enum('can_add_department_students',['true','false'])->default('false');
            $table->enum('can_add_department_faculties',['true','false'])->default('false');
            $table->enum('can_add_faculties',['true','false'])->default('false');
            $table->enum('can_add_students',['true','false'])->default('false');
            $table->enum('can_read_supervisors',['true','false'])->default('false');
            $table->enum('can_read_doctoral_committee',['true','false'])->default('false');
            $table->enum('can_edit_supervisors',['true','false'])->default('false');
            $table->enum('can_edit_doctoral_committee',['true','false'])->default('false');
            $table->enum('can_delete_department_students',['true','false'])->default('false');
            $table->enum('can_delete_department_faculties',['true','false'])->default('false');
            $table->enum('can_delete_faculties',['true','false'])->default('false');
            $table->enum('can_delete_students',['true','false'])->default('false');
            $table->enum('can_manage_roles',['true','false'])->default('false');
            $table->enum('can_edit_department',['true','false'])->default('false');
            $table->enum('can_add_department',['true','false'])->default('false');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('table_permissions');
    }
};
