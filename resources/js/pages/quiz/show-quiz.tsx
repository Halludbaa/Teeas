import { Quiz } from '@/model/quiz_model';
import { Link } from '@inertiajs/react';

interface ShowQuizProps {
    quiz: Quiz;
}

export default function ShowQuiz({ quiz }: ShowQuizProps) {
    return (
        <main className="flex h-screen w-screen items-center justify-center">
            <div className="flex flex-col justify-between gap-2 rounded-lg border-2 border-slate-500/20 p-4 shadow-lg">
                <h1 className="text-4xl font-bold">{quiz.name}</h1>
                <div className="flex flex-row-reverse justify-between gap-10">
                    <Link
                        href={route('quiz.start')}
                        method="post"
                        data={{ quizzes_id: quiz.id }}
                        replace={true}
                        onClick={(e) => {
                            (e.target as HTMLInputElement).disabled = true;
                        }}
                        className="cursor-pointer rounded-lg bg-blue-500/80 px-4 py-2 text-xl font-bold text-white disabled:bg-gray-500/50"
                    >
                        Play
                    </Link>
                    <div
                        onClick={() => window.history.back()}
                        className="cursor-pointer rounded-lg bg-slate-500/80 px-4 py-2 text-xl font-bold text-white"
                    >
                        Back
                    </div>
                </div>
            </div>
        </main>
    );
}
