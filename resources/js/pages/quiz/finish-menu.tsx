import { QuizHistory } from '@/model/quiz_model';
import { Link } from '@inertiajs/react';
import { CheckIcon, XIcon } from 'lucide-react';

interface FinishMenuProps {
    quizH: QuizHistory;
}

export default function FinishMenu({ quizH }: FinishMenuProps) {
    console.info(quizH);
    return (
        <main className="flex h-screen w-screen flex-col items-center justify-center text-xl">
            <div className="flex h-max min-h-52 w-max flex-col items-center rounded-lg border border-slate-600 p-4 shadow-lg shadow-slate-800/20 dark:bg-slate-200/50">
                <h1 className="text-4xl font-bold">Congratulation!</h1>
                <h2 className="mt-2 self-start">Accuracy: {((quizH.result[0].correct / quizH.quiz.questions.length) * 100).toFixed(2)}%</h2>
                <div className="mt-auto flex w-full flex-row justify-evenly">
                    <span className="flex flex-col items-center">
                        <CheckIcon /> {quizH.result[0].correct}
                    </span>
                    <span className="flex flex-col items-center">
                        <XIcon /> {quizH.result[0].incorrect}
                    </span>
                </div>
            </div>
            <Link href={route('home')} className="mx-auto mt-4 block cursor-pointer rounded-xl bg-black p-4 font-bold text-white">
                Go To Home
            </Link>
        </main>
    );
}
