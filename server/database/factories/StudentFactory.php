<?php
namespace Database\Factories;
use App\Models\Student; // Update the namespace according to your application structure
use Illuminate\Database\Eloquent\Factories\Factory;

class StudentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Student::class;

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
            'roll_no' => $this->faker->unique()->randomNumber(),
            'department_id' => null, // You may assign the department later
            'date_of_registration' => $this->faker->date(),
            'date_of_irb' => $this->faker->date(),
            'phd_title' => $this->faker->text,
            'fathers_name' => $this->faker->name('male'),
            'address' => $this->faker->address,
            'current_status' => $this->faker->randomElement(['part-time', 'full-time']),
            'overall_progress' => $this->faker->randomFloat(2, 0, 100),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}

