<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class AssignmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'subject_id' => fake()->numberBetween(0,3),
            'task' => "Najdi riešenie: {%x%}+5=y ",//fake()->sentence(),
            'variables' => "{x,2,10}",//fake()->sentence(),
            'solution' => "x+5",//fake()->sentence(),
        ];
    }
}
