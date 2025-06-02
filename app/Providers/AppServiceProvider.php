<?php

namespace App\Providers;

use App\Events\QuizCreated;
use App\Listeners\CalculateQuizResult;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */

    protected $listen = [
        QuizCreated::class => [
            CalculateQuizResult::class
        ]
    ];
    public function register(): void
    {
        //
    }


    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
