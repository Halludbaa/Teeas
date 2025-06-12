<?php

namespace App\Http\Middleware;

use App\Models\Quiz;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class MustQuizOwner
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $quiz = Quiz::find($request->parameter('id'));

        if ($quiz->creator_id != Auth::user()->id) {
            return redirect()->route("home");
        }

        return $next($request);
    }
}
