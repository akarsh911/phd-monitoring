<?php
namespace Database\Factories;
use App\Models\Faculty; // Update the namespace according to your application structure
use Illuminate\Database\Eloquent\Factories\Factory;

class FacultyFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Faculty::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => function () {
                return \App\Models\User::factory()->create()->id;
            },
            'designation' => $this->faker->jobTitle,
            'department_id' => function () {
                return \App\Models\Department::factory()->create()->id;
            },
            'faculty_code' => $this->faker->text,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
