<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
         //\App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $json = file_get_contents(base_path('database/data/assignments.json'));
        $data = json_decode($json, true);

        foreach ($data['allAssignments'] as $subject) {
            foreach ($subject['assignments'] as $assignmentData) {
                // Create a new Assignment model instance and fill it with data from the JSON
                \App\Models\Assignment::create([
                    'subject_id' => $subject['subject_id'],
                    'task' => $assignmentData['task'],
                    'variables' => $assignmentData['variables'],
                    'solution' => $assignmentData['solution'],
                ]);
            }
        }
    }
}
