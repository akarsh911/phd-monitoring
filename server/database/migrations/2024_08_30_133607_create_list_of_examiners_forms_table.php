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
        Schema::create('list_of_examiners_forms', function (Blueprint $table) {
            $this->addCommonFields($table);  
           
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('list_of_examiners_forms');
    }
};
