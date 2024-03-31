<?php
namespace Database\Factories;
use App\Models\Department; // Update the namespace according to your application structure
use Illuminate\Database\Eloquent\Factories\Factory;

class DepartmentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Department::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->unique()->word,
            'code' => $this->faker->unique()->word,
            'hod_id' => null, // You may assign the head of department later
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
