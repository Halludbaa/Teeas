<?php

namespace App\Listeners;

use App\Events\QuizCreated;
use App\Models\Question;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class CreateQuestionAfterQuiz
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
    public function handle(QuizCreated $event): void
    {
        Question::create([
            "question" => "Your Question Here!",
            "quiz_id" => $event->quiz->id
        ]);
    }
}
