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
        Schema::create('synopsis_submissions', function (Blueprint $table) {
            $this->addCommonFields($table);  
            $table->timestamps();
            $table->integer('current_progress')->default(0);
            $table->text('revised_title')->nullable();
            $table->text('synopsis_pdf')->nullable();
            $table->integer('total_progress')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('synopsis_submissions');
    }
};
