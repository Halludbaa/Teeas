import { QuizHistory } from '@/model/quiz_model';
import { Link } from '@inertiajs/react';
import { CheckIcon, SaveIcon, XIcon } from 'lucide-react';

interface FinishMenuProps {
    quizH: QuizHistory;
}

export default function FinishMenu({ quizH }: FinishMenuProps) {
    const uncompleted = quizH.quiz.questions.length - (quizH.result[0].incorrect + quizH.result[0].correct);
    console.info(quizH.quiz.questions);
    return (
        <main className="flex h-screen w-screen flex-col items-center justify-center gap-5 p-2 text-xl md:flex-row-reverse">
            <div>
                <div className="flex h-max min-h-52 w-max flex-col items-center rounded-lg border border-slate-600 p-4 shadow-lg shadow-slate-800/20 dark:bg-slate-500/20">
                    <h1 className="text-4xl font-bold">Congratulation!</h1>
                    <h2 className="mt-2 self-start">
                        Accuracy: {((quizH.result[0].correct / (quizH.quiz.questions.length - uncompleted)) * 100).toFixed(2)}%
                    </h2>
                    <div className="mt-auto flex w-full flex-row justify-evenly">
                        <span className="flex flex-col items-center">
                            <CheckIcon /> {quizH.result[0].correct}
                        </span>
                        <span className="flex flex-col items-center">
                            <SaveIcon /> {uncompleted}
                        </span>
                        <span className="flex flex-col items-center">
                            <XIcon /> {quizH.result[0].incorrect}
                        </span>
                    </div>
                </div>
                <Link
                    href={route('quiz.explore')}
                    className="mx-auto mt-4 block cursor-pointer rounded-xl bg-black p-4 font-bold text-white dark:bg-slate-300/30"
                >
                    Explore More
                </Link>
            </div>
            <div className="border-sr-600 flex h-100 min-h-52 w-full flex-col gap-2 overflow-y-auto rounded-lg border p-4 shadow-lg shadow-slate-800/20 md:w-[30rem] dark:bg-slate-500/20">
                <h1 className="text-2xl font-bold">Your Answer</h1>
                {quizH.quiz.questions.map((item, idx) => (
                    <div
                        key={idx}
                        className={
                            'rounded-lg border-2 p-2 ' +
                            (item.answer_histories.length != 0 && item.answer_histories[0].status ? `bg-green-200` : 'bg-red-300')
                        }
                    >
                        {item.question}
                        <div className="flex flex-col gap-1 p-2">
                            {item.answers.map((answer) => (
                                <span key={answer.id} className={'flex flex-row gap-2'}>
                                    <input
                                        type="radio"
                                        disabled
                                        checked={item.answer_histories.length != 0 && answer.id == item.answer_histories[0].answer_id}
                                    />
                                    <p>{answer.detail}</p>
                                    {item.right_answer_id == answer.id && <CheckIcon className="text-green-500" />}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
