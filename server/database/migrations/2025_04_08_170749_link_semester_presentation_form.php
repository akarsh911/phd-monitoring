<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Add to presentations table
        if (!Schema::hasColumn('presentations', 'semester_id')) {
            Schema::table('presentations', function (Blueprint $table) {
                $table->foreignId('semester_id')->nullable()->after('id')->constrained('semesters')->onDelete('set null');
                $table->boolean('leave')->default(false);
                $table->boolean('missed')->default(true);
            });
        }

        // Add to student_semester_off_forms table
        if (!Schema::hasColumn('student_semester_off_forms', 'semester_id')) {
            Schema::table('student_semester_off_forms', function (Blueprint $table) {
                $table->foreignId('semester_id')->nullable()->after('id')->constrained('semesters')->onDelete('set null');
            });
        }

        // Add to student_semester_offs table
        if (!Schema::hasColumn('student_semester_offs', 'semester_id')) {
            Schema::table('student_semester_offs', function (Blueprint $table) {
                $table->foreignId('semester_id')->nullable()->after('id')->constrained('semesters')->onDelete('set null');
            });
        }
    }

    public function down(): void
    {
        Schema::table('presentations', function (Blueprint $table) {
            if (Schema::hasColumn('presentations', 'semester_id')) {
                $table->dropForeign(['semester_id']);
                $table->dropColumn('semester_id');
            }
        });

        Schema::table('student_semester_off_forms', function (Blueprint $table) {
            if (Schema::hasColumn('student_semester_off_forms', 'semester_id')) {
                $table->dropForeign(['semester_id']);
                $table->dropColumn('semester_id');
            }
        });

        Schema::table('student_semester_offs', function (Blueprint $table) {
            if (Schema::hasColumn('student_semester_offs', 'semester_id')) {
                $table->dropForeign(['semester_id']);
                $table->dropColumn('semester_id');
            }
        });
    }
};
