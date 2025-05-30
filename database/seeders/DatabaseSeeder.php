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

        $answer_1 = Answer::create([
            "detail" => "A",
            "question_id" => $quest->id,
        ]);

        $quest->right_answer_id = $answer_1->id;
        $quest->save();

        $answer_2 = Answer::create([
            "detail" => "B",
            "question_id" => $quest->id,
        ]);

        $quiz_h = QuizHistories::create([
            "quizzes_id" => $quiz->id,
            "user_id" => $user->id,
        ]);

        $answer_h1 = AnswerHistories::create([
            "quiz_history_id" => $quiz_h->id,
            "question_id" => $quest->id,
            "answer_id" => $answer_2->id,
            "status" => $quest->right_answer_id == $answer_2->id,
        ]);
    }
}
