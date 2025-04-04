<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('approvals', function (Blueprint $table) {
            $table->id();
            $table->string('key', 64)->unique(); // Unique, long key
            $table->string('email');
            $table->string('action'); // Accept, Reject, etc.
            $table->string('model_type'); // Model class name
            $table->unsignedBigInteger('model_id'); // ID of the model
            $table->boolean('approved')->nullable(); // Null = Pending, true = Approved, false = Rejected
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('approvals');
    }
};
