<?php

use App\Models\Traits\MigrationCommonFormFields;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    use MigrationCommonFormFields;
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('irb_sub_forms', function (Blueprint $table) {
            $this->addCommonFields($table);   
            $table->enum('form_type',['draft','revised'])->default('draft');
            $table->text('phd_title')->nullable();
            $table->text('revised_phd_title')->nullable();
            $table->text('irb_pdf')->nullable();
            $table->text('revised_irb_pdf')->nullable();
            $table->text('date_of_irb')->nullable();
            $table->text('revised_date_of_irb')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('irb_sub_forms');
    }
};
