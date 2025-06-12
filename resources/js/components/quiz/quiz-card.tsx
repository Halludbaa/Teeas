import { ShowQuiz } from '@/model/quiz_model';
import { Link } from '@inertiajs/react';
import { LucideShare2, PencilIcon } from 'lucide-react';

export interface QuizCardProps {
    quiz: ShowQuiz;
    display?: boolean;
}

export function QuizCard({ quiz, display = true }: QuizCardProps) {
    return (
        <div className="card">
            <span
                className={`h-full w-full overflow-hidden rounded-t-lg bg-slate-600 bg-cover bg-center bg-no-repeat`}
                // style={{ backgroundImage: `url("/storage/uploads/${quiz.banner}")` }}
            ></span>
            <div className="text-md flex flex-row items-center justify-between justify-self-end p-1 font-bold">
                <div className="flex flex-row items-center gap-2 text-xl">
                    <h1 className="">
                        {quiz.name} <p className="text-sm font-normal">{quiz.user.name}</p>
                    </h1>
                    <Link href={route('quiz.show', quiz.id)} className="rounded-md bg-blue-500/80 px-4 py-2 text-white">
                        Play
                    </Link>
                </div>
                <div className="flex flex-row">
                    {display && (
                        <Link
                            href={route('quiz.create', quiz.id)}
                            className="scale-75 cursor-pointer p-1 text-black transition-all duration-150 hover:-rotate-45 dark:text-white"
                        >
                            <PencilIcon />
                        </Link>
                    )}
                    <button>
                        <LucideShare2 />
                    </button>
                </div>
            </div>
        </div>
    );
}

// Laravel React fetch Self
