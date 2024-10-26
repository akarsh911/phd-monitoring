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
        Schema::create('thesis_submissions', function (Blueprint $table) {
            $this->addCommonFields($table);  
            $table->text('date_of_synopsis')->nullable();
            $table->text('reciept_no')->nullable();
            $table->text('date_of_fee_submission')->nullable();
            $table->text('thesis_pdf')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('thesis_submissions');
    }
};
