<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use Illuminate\Http\Request;

class AnswerController extends Controller
{
    function update(Request $request)
    {
        // dd($request->all());
        $validate = $request->validate([
            "id" => "required",
            "detail" => "required",
        ]);

        Answer::find($validate["id"])->update($request->only("detail"));


        return redirect()->back();
    }
}
