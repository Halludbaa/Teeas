<?php

namespace App\Models;

use App\Events\QuizCreated;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Quiz extends Model
{
    /** @use HasFactory<\Database\Factories\QuizFactory> */
    use HasFactory, HasUuids;
    protected $dispatchesEvents = [
        "created" => QuizCreated::class
    ];

    protected $guarded = ["id", "updated_at", "created_at"];

    protected static function booted(): void
    {
        self::creating(static function (Quiz $quiz): void {
            $quiz->creator_id = Auth::user()->id ?? User::first()->id;
        });
    }

    function user()
    {
        return $this->belongsTo(User::class, "creator_id", "id");
    }

    function questions()
    {
        return $this->hasMany(Question::class, "quiz_id", "id");
    }

    function history()
    {
        return $this->hasMany(QuizHistories::class, "quizzes_id", "id");
    }
}
