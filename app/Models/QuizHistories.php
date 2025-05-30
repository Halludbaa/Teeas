<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class QuizHistories extends Model
{

    use HasUlids;

    protected $table = 'quiz_histories';

    protected $fillable = ["quizzes_id", "user_id"];

    protected static function booted()
    {
        static::creating(function (QuizHistories $quizH) {
            $quizH->user_id = Auth::user()->id;
        });
    }

    function quiz()
    {
        return $this->belongsTo(Quiz::class, "quizzes_id", "id");
    }

    function answer_histories()
    {
        return $this->hasMany(AnswerHistories::class, "quiz_history_id", "id");
    }

    function user()
    {
        return $this->belongsTo(User::class, "user_id", "id");
    }
}
