<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFiltersTable extends Migration
{
    public function up()
    {
        Schema::create('filters', function (Blueprint $table) {
            $table->id();
            $table->string('key_name')->unique();       // e.g., "student_roll"
            $table->string('label');                    // e.g., "Student Roll Number"
            $table->string('data_type');                // string, number, date, etc.
            $table->string('function_name');            // function in FilterLogicTrait
            $table->text('applicable_pages')->nullable(); // Comma-separated: admin,hod,guide
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('filters');
    }
}
