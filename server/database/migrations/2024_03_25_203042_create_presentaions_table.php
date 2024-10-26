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
        Schema::create('presentations', function (Blueprint $table) {
            $this->addCommonFields($table);

            $table->date('date')->nullable();    
            $table->string('time')->nullable();
            $table->string('venue')->nullable();

            $table->string('period_of_report')->nullable();
            
            $table->enum('teaching_work',['UG','PG','Both','None'])->default('None');
            $table->text('presentation_pdf')->nullable();

            $table->integer('progress')->nullable();
            $table->integer('total_progress')->default(0);
            $table->integer('current_progress')->default(0);
            $table->integer('contact_hours')->default(0);
            $table->float('attendance')->default(0);


            $table->enum('overall_progress', ['satisfactory','not satisfactory'])->default('not satisfactory');
       
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('presentations');
    }
};
