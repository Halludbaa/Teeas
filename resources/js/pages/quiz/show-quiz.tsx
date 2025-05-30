import { Quiz } from '@/model/quiz_model';
import { Link } from '@inertiajs/react';

interface ShowQuizProps {
    quiz: Quiz;
}

export default function ShowQuiz({ quiz }: ShowQuizProps) {
    return (
        <main className="flex h-screen w-screen flex-col items-center justify-center gap-2">
            <h1 className="text-4xl font-bold">{quiz.name}</h1>
            <div className="flex flex-row-reverse gap-2">
                <Link
                    href={route('quiz.start')}
                    method="post"
                    data={{ quizzes_id: quiz.id }}
                    replace={true}
                    className="rounded-lg bg-blue-500/80 px-4 py-2 text-xl font-bold text-white"
                >
                    Play
                </Link>
                <div onClick={() => window.history.back()} className="rounded-lg bg-yellow-500/80 px-4 py-2 text-xl font-bold text-white">
                    Back
                </div>
            </div>
        </main>
    );
}
