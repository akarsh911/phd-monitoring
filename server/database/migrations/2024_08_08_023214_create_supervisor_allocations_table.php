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
        Schema::create('supervisor_allocation_form', function (Blueprint $table) {
            $this->addCommonFields($table); 
            $table->json('prefrences')->nullable();
            $table->json('supervisors')->nullable(); 
            $table->timestamps();
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('supervisor_allocations');
    }
};
