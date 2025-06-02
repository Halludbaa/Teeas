<?php

namespace App\Models;

use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUlids;

class QuizResult extends Model
{
    use HasUlids;

    protected $table = "quiz_results";
    protected $guarded = ["id", "created_at", "updated_at"];

    protected static function booted(): void
    {
        self::creating(static function (QuizResult $quiz): void {
            $quiz->user_id = Auth::user()->id;
        });
    }


    function quiz_history()
    {
        return $this->belongsTo(QuizHistories::class, "quiz_history_id", "id");
    }

    function quiz()
    {
        return $this->belongsTo(Quiz::class, "quizzes_id", "id");
    }

    function user()
    {
        return $this->belongsTo(User::class, "user_id", "id");
    }
}
