<?php

namespace App\Http\Controllers;

use App\Events\QuizCreated;
use Illuminate\Http\RedirectResponse;
use App\Models\Quiz;
use App\Models\Answer;
use App\Models\AnswerHistories;
use App\Models\Question;
use App\Models\QuizHistories;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class QuizController extends Controller
{
    function destroy(Request $request)
    {
        $validate = $request->validate([
            "id" => "required",
        ]);

        QuizHistories::destroy($validate["id"]);
    }

    function create(string $id)
    {
        $quiz = Quiz::with([
            "questions:id,question,quiz_id,right_answer_id" => [
                "answers:id,detail,question_id",
            ]
        ])->where("id", "=", $id)->get(["id", "name", "creator_id", "status", "banner"])->toArray()[0] ?? [];

        return Inertia::render("quiz/quiz-create", compact("quiz"));
    }

    function play(string $id)
    {
        $quizH =  QuizHistories::with([
            "quiz:id,name,creator_id,status" => [
                "questions:id,question,quiz_id,right_answer_id" => [
                    "answers:id,detail,question_id",
                    "answer_histories" => fn($q) => $q->where("quiz_history_id", "=", $id)->select("id", "question_id", "status")
                ]
            ]
        ])->where("id", "=", $id)->get([
            "id",
            "quizzes_id",
            "status",
            "user_id"
        ])->toArray()[0] ?? [];
        return Inertia::render("quiz/quiz-room", compact("quizH"));
    }

    function store(Request $request): RedirectResponse
    {
        $validated = $request->validate(
            [
                "name" => "required|min:4"
            ]
        );
        $quiz = Quiz::create($validated);


        return redirect(route("quiz.create", $quiz->id));
    }

    function save(Request $request)
    {
        $validate = $request->validate([
            "quiz_history_id" => "required",
            "answer_id" => "required",
            "question_id" => "required",
            "is_last" => "required"
        ]);

        if ($validate["is_last"] == "finished") {
            $quiz = QuizHistories::find($validate["quiz_history_id"]);
            $quiz->status = "finished";
            $quiz->save();
        }

        AnswerHistories::create($request->only(["quiz_history_id", "answer_id", "question_id"]));
    }


    function show(string $id)
    {
        $quiz = Quiz::where("id", "=", $id)->get(["id", "name", "creator_id", "status", "banner"])->toArray()[0] ?? [];

        return Inertia::render("quiz/show-quiz", compact("quiz"));
    }


    function start(Request $request)
    {
        $validate = $request->validate([
            "quizzes_id" => "required",
        ]);

        $quizH = QuizHistories::create($validate);

        return redirect()->route("quiz.play", $quizH->id);
    }

    function history()
    {
        $history = QuizHistories::with([
            "quiz:id,name,banner,creator_id" => [
                "user:id,name"
            ]
        ])->where("user_id", "=", Auth::user()->id)
            ->get()
            ->toArray() ?? [];


        return Inertia::render("history", compact("history"));
    }
}
