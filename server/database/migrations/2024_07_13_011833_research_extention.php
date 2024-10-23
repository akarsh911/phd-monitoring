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
        //
        Schema::create('research_extentions_form', function (Blueprint $table) {
            $this->addCommonFields($table); 
            $table->integer('period_of_extention')->nullable()->default(6);
            $table->text('research_pdf')->nullable();
            $table->text('reason')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
