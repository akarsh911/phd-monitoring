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
        Schema::create('supervisor_change_forms', function (Blueprint $table) {
            $this->addCommonFields($table);   
            $table->text('reason')->nullable();
            $table->boolean('irb_submitted')->default(false);
            $table->json('to_change')->nullable();
            $table->json('prefrences')->nullable();
            $table->json('current_supervisors')->nullable();
            $table->json('new_supervisors')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('supervisor_change_forms');
    }
};
