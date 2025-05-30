<?php

namespace App\Http\Controllers;

use App\Models\Question;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    function update(Request $request)
    {
        // dd($request->all());
        $validate = $request->validate([
            "id" => "required",
            "question" => "required",
        ]);

        Question::find($validate["id"])->update($request->only("question"));


        return redirect()->back();
    }

    function changeTrue(Request $request)
    {
        $validate = $request->validate([
            "id" => "required",
            "right_answer_id" => "required"
        ]);

        Question::find($validate["id"])->update($request->only("right_answer_id"));

        return redirect()->back();
    }

    function store(Request $request)
    {
        $validate = $request->validate([
            "question" => "min:1|required|string",
            "quiz_id" => "required",
        ]);

        $quest = Question::create($validate);
        return redirect()->route("quiz.create", ["id" => $validate["quiz_id"]]);
    }
}
