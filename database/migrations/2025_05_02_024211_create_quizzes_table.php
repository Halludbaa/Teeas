<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('quizzes', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->string("name", 150);
            $table->string("banner", 200)->nullable();
            $table->foreignUuid('creator_id')->references("id")->on("users")->index();
            $table->enum("status", ["public", "private", "unlisted"])->default("public");
            $table->timestamps();
        });

        Schema::create('quiz_histories', function (Blueprint $table) {
            $table->ulid("id")->primary();
            $table->enum("mode", ["practice", "test"])->default("practice");
            $table->foreignUuid('quizzes_id')->references("id")->on("quizzes")->cascadeOnDelete();
            $table->foreignUuid('user_id')->nullable()->index();
            $table->enum("status", ["unfinished", "finished"])->default("unfinished");
            $table->timestamps();
        });

        Schema::create('quiz_results', function (Blueprint $table) {
            $table->ulid("id")->primary();
            $table->foreignUlid('quiz_history_id')->references("id")->on("quiz_histories")->cascadeOnDelete();
            $table->foreignUuid('quizzes_id')->references("id")->on("quizzes")->cascadeOnDelete();
            $table->foreignUuid('user_id')->nullable()->index();
            $table->integer("correct")->default(0);
            $table->integer("incorrect")->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quizzes');
        Schema::dropIfExists('quiz_histories');
    }
};
