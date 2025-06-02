<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use Illuminate\Http\Request;

class AnswerController extends Controller
{
    function update(Request $request)
    {
        $validate = $request->validate([
            "id" => "required",
            "detail" => "required",
        ]);

        Answer::find($validate["id"])->update($request->only("detail"));


        return redirect()->back();
    }

    function store(Request $request)
    {
        $validate = $request->validate([
            "detail" => "required",
            "question_id" => "required",
        ]);

        Answer::create($validate);
    }

    function destroy(Request $request)
    {
        $request->validate([
            "id" => "required",
        ]);

        Answer::destroy($request->id);
    }
}
