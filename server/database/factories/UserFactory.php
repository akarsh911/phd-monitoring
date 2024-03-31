<?php
namespace Database\Factories;
use App\Models\User; // Update the namespace according to your application structure
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'first_name' => $this->faker->firstName,
            'last_name' => $this->faker->lastName,
            'phone' => $this->faker->phoneNumber,
            'email' => $this->faker->unique()->safeEmail,
            'gender' => $this->faker->randomElement(['Male', 'Female', 'Others']),
            'role_id' => function () {
                return \App\Models\Role::factory()->create()->id;
            },
            'first_activation' => $this->faker->randomElement(['true', 'false']),
            'status' => $this->faker->randomElement(['active', 'inactive']),
            'profile_picture' => $this->faker->imageUrl(),
            'address' => $this->faker->address,
            'password' => Hash::make('Password@123'), // You may change the default password
            'remember_token' => null,
            'email_verified_at' => now(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
