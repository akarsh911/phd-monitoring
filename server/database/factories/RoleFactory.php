<?php
namespace Database\Factories;
use App\Models\Role; // Update the namespace according to your application structure
use Illuminate\Database\Eloquent\Factories\Factory;

class RoleFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Role::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'role' => $this->faker->unique()->word,
            'can_read_all_students' => $this->faker->randomElement(['true', 'false']),
            'can_read_all_faculties' => $this->faker->randomElement(['true', 'false']),
            'can_read_supervised_students' => $this->faker->randomElement(['true', 'false']),
            'can_read_department_students' => $this->faker->randomElement(['true', 'false']),
            'can_read_department_faculties' => $this->faker->randomElement(['true', 'false']),
            'can_edit_all_students' => $this->faker->randomElement(['true', 'false']),
            'can_edit_all_faculties' => $this->faker->randomElement(['true', 'false']),
            'can_edit_department_students' => $this->faker->randomElement(['true', 'false']),
            'can_edit_department_faculties' => $this->faker->randomElement(['true', 'false']),
            'can_edit_own_profile' => $this->faker->randomElement(['true', 'false']),
            'can_edit_phd_title' => $this->faker->randomElement(['true', 'false']),
            'can_add_department_students' => $this->faker->randomElement(['true', 'false']),
            'can_add_department_faculties' => $this->faker->randomElement(['true', 'false']),
            'can_add_faculties' => $this->faker->randomElement(['true', 'false']),
            'can_add_students' => $this->faker->randomElement(['true', 'false']),
            'can_read_supervisors' => $this->faker->randomElement(['true', 'false']),
            'can_read_doctoral_committee' => $this->faker->randomElement(['true', 'false']),
            'can_edit_supervisors' => $this->faker->randomElement(['true', 'false']),
            'can_edit_doctoral_committee' => $this->faker->randomElement(['true', 'false']),
            'can_delete_department_students' => $this->faker->randomElement(['true', 'false']),
            'can_delete_department_faculties' => $this->faker->randomElement(['true', 'false']),
            'can_delete_faculties' => $this->faker->randomElement(['true', 'false']),
            'can_delete_students' => $this->faker->randomElement(['true', 'false']),
            'can_manage_roles' => $this->faker->randomElement(['true', 'false']),
            'can_edit_department' => $this->faker->randomElement(['true', 'false']),
            'can_add_department' => $this->faker->randomElement(['true', 'false']),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
