<?php

use App\Models\Quiz;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\AnswerController;
use App\Http\Controllers\QuestionController;

Route::get('/', function () {
    return redirect()->route("dashboard");
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::post("quiz", [QuizController::class, 'store'])->name("quiz.store");
    Route::patch("quiz", [QuizController::class, 'update'])->name("quiz.update");
    Route::delete("quiz", [QuizController::class, 'delete'])->name("quiz.delete");
    Route::post("quiz/start", [QuizController::class, 'start'])->name("quiz.start");

    Route::post("quiz/save", [QuizController::class, "save"])->name("quiz.save");
    Route::get("quiz/{id}", [QuizController::class, 'show'])->name("quiz.show");
    Route::get("quiz/{id}/create", [QuizController::class, 'create'])->name("quiz.create");
    Route::get("quiz/{id}/play", [QuizController::class, 'play'])->name("quiz.play");

    Route::post("question", [QuestionController::class, "store"])->name("question.store");
    Route::delete("question", [QuestionController::class, "destroy"])->name("question.destroy");
    Route::patch("question", [QuestionController::class, "update"])->name("question.update");
    Route::patch("question/right", [QuestionController::class, "changeTrue"])->name("question.right.update");

    Route::patch("answer", [AnswerController::class, "update"])->name("answer.update");
    Route::post("answer", [AnswerController::class, "store"])->name("answer.store");
    Route::delete("answer", [AnswerController::class, "destroy"])->name("answer.destroy");

    Route::delete("history/quiz", [QuizController::class, 'destroy'])->name("quiz.destroy");
    Route::get("history/quiz", [QuizController::class, 'history'])->name("quiz.history");
    Route::get('dashboard', function () {
        $quiz = Quiz::where("creator_id", "=", Auth::user()->id)->get()->toArray();
        return Inertia::render('dashboard', compact("quiz"));
    })->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
