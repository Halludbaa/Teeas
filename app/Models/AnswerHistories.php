<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class AnswerHistories extends Model
{
    use HasUuids;

    protected $table = 'answer_histories';

    protected $guarded = ["id", "updated_at", "created_at"];

    protected static function booted()
    {
        static::created(function (AnswerHistories $answer) {
            $answer->status = $answer->answer_id == $answer->question->right_answer_id;
            $answer->save();
        });
    }

    function question()
    {
        return $this->belongsTo(Question::class, "question_id", "id");
    }

    function quiz_history()
    {
        return $this->belongsTo(QuizHistories::class, "quiz_history_id", "id");
    }
}
