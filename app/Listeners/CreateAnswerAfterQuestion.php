<?php

namespace App\Listeners;

use App\Events\QuestionCreated;
use App\Models\Answer;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class CreateAnswerAfterQuestion
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
    public function handle(QuestionCreated $event): void
    {
        $answer = Answer::create([
            "detail" => "Your Answer Detail 1",
            "question_id" => $event->question->id,
        ]);


        Answer::create([
            "detail" => "Your Answer Detail 2",
            "question_id" => $event->question->id,
        ]);

        $event->question->right_answer_id = $answer->id;
        $event->question->save();
    }
}
