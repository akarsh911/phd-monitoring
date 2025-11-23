<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Traits\MigrationCommonFormFields;
return new class extends Migration
{
    /**
     * Run the migrations.
    */
    use MigrationCommonFormFields;
    public function up(): void
    {
    
        Schema::create('table_revise_title_form', function (Blueprint $table) {
            $this->addCommonFields($table);
            $table->text('current_title')->nullable();
            $table->text('proposed_title')->nullable();
            $table->text('justification')->nullable();
            $table->json('current_objectives')->nullable();
            $table->json('proposed_objectives')->nullable();
            $table->timestamps();
        });
        Schema::create('student_objectives', function (Blueprint $table) {
            $table->increments('id');
            $table->primary('id');
            $table->integer('student_id')->unsigned()->index();
            $table->foreign('student_id')->references('roll_no')->on('students')->onDelete('cascade');
            $table->string('objective');
            $table->timestamps();
        });
    }
 
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('table_revise_title_form');
    }
};
