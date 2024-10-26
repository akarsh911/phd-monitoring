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
        Schema::create('student_semester_off_forms', function (Blueprint $table) {
            $this->addCommonFields($table);  
            $table->timestamps();
            $table->text('previous_approval_pdf')->nullable();
            $table->text('semester_off_required')->nullable();
            $table->text('proof_pdf')->nullable();
            $table->text('reason')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_semester_off_forms');
    }
};
