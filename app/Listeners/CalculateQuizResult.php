<?php

namespace App\Listeners;

use App\Models\QuizResult;
use App\Events\QuizFinished;
use App\Models\QuizHistories;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class CalculateQuizResult
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(QuizFinished $event): void
    {
        $quiz = QuizHistories::withCount([
            "incorrect_answer" => fn($query) => $query->where("status", "=", false),
            "answer_histories" => fn($query) => $query->where("status", "=", true),
        ])->where("id", "=", $event->quizH->id)->get([
            "id",
            "quizzes_id"
        ])->toArray()[0];

        QuizResult::create([
            "quiz_history_id" => $quiz["id"],
            "quizzes_id" => $quiz["quizzes_id"],
            "correct" => $quiz["answer_histories_count"],
            "incorrect" => $quiz["incorrect_answer_count"],
        ]);
    }
}
