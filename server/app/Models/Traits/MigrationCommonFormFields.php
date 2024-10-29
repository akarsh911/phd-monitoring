<?php 
namespace App\Models\Traits;

use Illuminate\Database\Schema\Blueprint;

trait MigrationCommonFormFields
{
    /**
     * Add common fields to a migration.
     *
     * @param Blueprint $table
     * @return void
     */
    public function addCommonFields(Blueprint $table)
    {
        $table->increments('id');
        $table->primary('id');
        $table->integer('student_id')->unsigned()->index();
        $table->foreign('student_id')->references('roll_no')->on('students')->onDelete('cascade');
   
        $table->enum('completion', ['incomplete', 'complete'])->nullable()->default('incomplete');
        $table->enum('status', ['draft','pending', 'approved', 'rejected'])->nullable()->default('pending'); // Common field
        $table->enum('stage', ['student', 'hod','phd_coordinator', 'supervisor','doctoral','external', 'dordc', 'dra'])->nullable()->default('student'); // Common field
        $table->json('history')->nullable(); 
        $table->json('steps')->nullable();
        $table->integer('current_step')->nullable()->default(0); 
        $table->integer('maximum_step')->nullable()->default(0); 
        
        //Common Approval fields
        $table->boolean('supervisor_approval')->nullable()->default(false);
        $table->boolean('phd_coordinator_approval')->nullable()->default(false);
        $table->boolean('hod_approval')->nullable()->default(false);
        $table->boolean('dordc_approval')->nullable()->default(false);
        $table->boolean('dra_approval')->nullable()->default(false);
        $table->boolean('director_approval')->nullable()->default(false);
        $table->boolean('external_approval')->nullable()->default(false);
        $table->boolean('doctoral_approval')->nullable()->default(false);


        // Common lock fields
        $table->boolean('student_lock')->nullable()->default(false); 
        $table->boolean('phd_coordinator_lock')->nullable()->default(true);
        $table->boolean('hod_lock')->nullable()->default(true); 
        $table->boolean('supervisor_lock')->nullable()->default(true); 
        $table->boolean('dordc_lock')->nullable()->default(true); 
        $table->boolean('dra_lock')->nullable()->default(true); 
        $table->boolean('director_lock')->nullable()->default(true);
        $table->boolean('doctoral_lock')->nullable()->default(true);

        // Comments fields for each role (nullable)
        $table->text('student_comments')->nullable();
        $table->text('phd_coordinator_comments')->nullable();
        $table->text('hod_comments')->nullable();
        $table->text('supervisor_comments')->nullable();
        $table->text('dordc_comments')->nullable();
        $table->text('dra_comments')->nullable();
        $table->text('director_comments')->nullable();
        $table->text('external_comments')->nullable();
        $table->text('doctoral_comments')->nullable();
    }
}
