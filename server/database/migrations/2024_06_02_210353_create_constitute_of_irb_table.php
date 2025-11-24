<?php

namespace App\Database\Migrations;

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Traits\MigrationCommonFormFields;

return new class extends Migration
{
    use MigrationCommonFormFields; 

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('constitute_of_irb', function (Blueprint $table) {
            $table->timestamps();
            $this->addCommonFields($table);  
            $table->text('phd_title')->nullable();
            $table->text('irb_pdf')->nullable();
            $table->integer('cognate_expert')->unsigned()->index()->nullable();;
            $table->foreign('cognate_expert')->references('faculty_code')->on('faculty')->onDelete('cascade');
            $table->date('date_of_admission')->nullable();       
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('constitute_of_irb');
    }
};
