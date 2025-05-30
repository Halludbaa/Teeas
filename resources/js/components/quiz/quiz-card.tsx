import { ShowQuiz } from '@/model/quiz_model';
import { Link } from '@inertiajs/react';

export interface QuizCardProps {
    quiz: ShowQuiz;
}

export function QuizCard({ quiz }: QuizCardProps) {
    return (
        <div className="card">
            <span
                className={`bg-background h-full w-full overflow-hidden rounded-t-lg bg-contain bg-center bg-no-repeat`}
                style={{ backgroundImage: `url("/storage/uploads/${quiz.banner}")` }}
            ></span>
            <div className="text-md flex flex-row items-center justify-self-end p-1 font-bold">
                <Link href={route('quiz.create', quiz.id)} className="w-full">
                    {quiz.name}
                </Link>
                <Link href={route('quiz.show', quiz.id)} className="rounded-md bg-blue-500/80 px-4 py-2 text-white">
                    Play
                </Link>
            </div>
        </div>
    );
}

// Laravel React fetch Self
