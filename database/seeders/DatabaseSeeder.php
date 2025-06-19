<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Assignment;
use App\Models\Hint;
use App\Models\Theme;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $md1 = file_get_contents(base_path('database/data/Theme1n.md'));
        $md2 = file_get_contents(base_path('database/data/Theme2n.md'));
        \App\Models\User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'role' => 'Admin',
        ]);
        \App\Models\User::factory(32)->create();
        $theme1 = Theme::create([
            'title' => 'Úvod do Matematickej štatistiky',
            'text' => $md1,]);
        $theme2 = Theme::create([
            'title' => 'Pravdepodobnosť a Kombinatorika',
            'text' => $md2,]);


        $hints=Hint::insert([
            ['hint'=>'Nápoveda 1'],
            ['hint'=>'Nápoveda 2'],
            ['hint'=>'Nápoveda 3'],
            ['hint'=>'Nápoveda 4'],
            ['hint'=>'Nápoveda 5'],
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
        Assignment::find(1)->hints()->attach([1]);
        Assignment::find(2)->hints()->attach([2,3,4,5]);
    }
}
