<?php

namespace Database\Seeders;

use App\Models\Answer;
use App\Models\AnswerHistories;
use App\Models\Question;
use App\Models\Quiz;
use App\Models\QuizHistories;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $user = User::factory()->create([
            'name' => 'Alisa Kujou',
            'email' => 'alyaa@roshidere.com',
            'password' => 'roshidereisthebest',
        ]);

        $quiz = Quiz::create([
            "name" => "Hello Quiz",
            "creator_id" => $user->id,
        ]);


        $quest = Question::create([
            "question" => "A or B",
            "quiz_id" => $quiz->id,
        ]);
    }
}
