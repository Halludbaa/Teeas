<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    /** @use HasFactory<\Database\Factories\AnswerFactory> */
    use HasFactory, HasUuids;

    protected $fillable = ["detail", "question_id"];

    function question()
    {
        return $this->belongsTo(Question::class, "question_id", "id");
    }
}
