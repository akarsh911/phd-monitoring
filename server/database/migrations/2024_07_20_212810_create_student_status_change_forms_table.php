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
        Schema::create('student_status_change_forms', function (Blueprint $table) {
            $this->addCommonFields($table);   
            $table->text('reason')->nullable();
            $table->enum('type_of_change', ['full-time to part-time', 'part-time to full-time'])->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_status_change_forms');
    }
};
