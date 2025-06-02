import { router } from '@inertiajs/react';

const updateQuestion = (question: string, id: string) => {
    router.patch(
        route('question.update'),
        {
            question: question,
            id: id,
        },
        {
            preserveScroll: true,
            async: true,
        },
    );
};

const updateAnswer = (detail: string, id: string) => {
    router.patch(
        route('answer.update'),
        {
            id: id,
            detail: detail,
        },
        {
            preserveScroll: true,
            async: true,
        },
    );
};

const updateRightAnswer = (question_id: string, answer_id: string) => {
    router.patch(
        route('question.right.update'),
        {
            id: question_id,
            right_answer_id: answer_id,
        },
        {
            preserveScroll: true,
            async: true,
        },
    );
};

const createQuestion = (question: string, quiz_id: string) => {
    router.post(
        route('question.store'),
        {
            question: question,
            quiz_id: quiz_id,
        },
        {
            preserveScroll: true,
            async: true,
            onSuccess() {
                router.get(route('quiz.create', quiz_id), {}, { async: true, preserveScroll: true });
            },
        },
    );
};

const createAnswer = (detail: string, question_id: string, quiz_id: string) => {
    router.post(
        route('answer.store'),
        {
            detail: detail,
            question_id: question_id,
        },
        {
            preserveScroll: true,
            async: true,
            onSuccess() {
                router.get(route('quiz.create', quiz_id), {}, { async: true, preserveScroll: true });
            },
        },
    );
};

export { createAnswer, createQuestion, updateAnswer, updateQuestion, updateRightAnswer };
