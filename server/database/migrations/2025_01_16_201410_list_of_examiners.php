<?php

use App\Models\Traits\MigrationCommonFormFields;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    use MigrationCommonFormFields;
    public function up(): void
    {
        Schema::create('list_of_examiners', function (Blueprint $table) {
            $table->id();
            $table->integer('examiner_id')->unsigned()->index();
            $table->foreign('examiner_id')->references('id')->on('examiners_details')->onDelete('cascade');
            $table->integer('student_id')->unsigned()->index();
            $table->foreign('student_id')->references('roll_no')->on('students')->onDelete('cascade');
            $table->integer('faculty_id')->unsigned()->index();
            $table->foreign('faculty_id')->references('faculty_code')->on('faculty')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('list_of_examiners');
    }
};
