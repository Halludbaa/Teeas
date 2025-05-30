<?php

namespace App\Models;

use App\Events\QuestionCreated;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    /** @use HasFactory<\Database\Factories\QuestionFactory> */
    use HasFactory, HasUuids;
    protected $dispatchesEvents = [
        "created" => QuestionCreated::class
    ];

    protected $fillable = ["question", "quiz_id", "right_answer_id"];

    function quiz()
    {
        return $this->belongsTo(Quiz::class, 'quiz_id', "id");
    }

    function answers()
    {
        return $this->hasMany(Answer::class, 'question_id', 'id');
    }

    function answer_histories()
    {
        return $this->hasMany(AnswerHistories::class, 'question_id', 'id');
    }

    function right_answer()
    {
        return $this->hasOne(Answer::class, 'right_answer_id', "id");
    }
}
