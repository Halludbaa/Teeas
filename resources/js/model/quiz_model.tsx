export interface Quiz {
    id: string;
    name: string;
    creator_id: string;
    status: string;
    banner: string;
    questions: Question[];
    user: User;
}

export interface User {
    id: string;
    name: string;
    email: string;
}

export interface Question {
    id: string;
    question: string;
    quiz_id: string;
    right_answer_id: string;
    answers: Answer[];
    answer_histories: AnswerHistory[];
}

export interface Answer {
    id: string;
    question_id: string;
    detail: string;
}

export interface AnswerHistory {
    id: string;
    answer_id: string;
    question_id: string;
    status: string;
}

export interface QuizHistory {
    id: string;
    status: 'finished' | 'unfinished';
    quizzes_id: string;
    user_id: string;
    created_at: string;
    updated_at: string;
    quiz: Quiz;
}

export interface ShowQuiz {
    id: string;
    name: string;
    banner: string;
    creator_id: string;
    status: string;
    created_at: string;
    updated_at: string;
}
