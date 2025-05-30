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
        Schema::create('answers', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->string("detail", 200)->nullable();
            $table->foreignUuid("question_id")
                ->references("id")->on("questions")->cascadeOnDelete();
            $table->timestamps();
        });


        Schema::table('questions', function (Blueprint $table) {
            $table->foreignUuid('right_answer_id')->nullable()->references("id")->on("answers")->nullOnDelete();
        });

        Schema::create('answer_histories', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->foreignUlid('quiz_history_id')->references("id")->on("quiz_histories")->cascadeOnDelete();
            $table->foreignUuid('answer_id')->references("id")->on("answers")->cascadeOnDelete();
            $table->foreignUuid("question_id")
                ->references("id")->on("questions")->cascadeOnDelete();
            $table->boolean("status")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('answers');
        Schema::dropIfExists('questions');
        Schema::dropIfExists('answer_histories');
    }
};
