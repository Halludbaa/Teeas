import AnswerInput, { AnswerSelected } from '@/components/quiz/answer-input';
import { QuizHistory } from '@/model/quiz_model';
import { Head, router } from '@inertiajs/react';
import { FormEventHandler, useEffect, useRef, useState } from 'react';
import FinishMenu from './finish-menu';

type NextQuestion = FormEventHandler;

interface QuizRoomProps {
    quizH: QuizHistory;
}
export default function QuizRoom({ quizH }: QuizRoomProps) {
    const questions = quizH.quiz.questions;
    const options = useRef<HTMLFormElement>(null);
    const [current, setCurrent] = useState<number>(0);
    const [selected, setSelected] = useState('');
    const [isCheck, setCheck] = useState<boolean>(true);
    const [isFinish, setFinish] = useState<boolean>(quizH.status == 'finished');
    const [isLast, setLast] = useState<boolean>(false);
    const currentQuestion = questions[current];

    const onNext: NextQuestion = (e) => {
        setCheck(false);
        router.post(
            route('quiz.save'),
            {
                quiz_history_id: quizH.id,
                answer_id: selected,
                question_id: currentQuestion.id,
                is_last: isLast ? 'finished' : 'unfinished',
            },
            {
                async: true,
                onSuccess() {
                    options.current?.reset();

                    setSelected('');

                    if (current < questions.length - 1) {
                        setCurrent(current + 1);
                    } else {
                        setFinish(true);
                    }

                    if (questions.length - 2 == current) {
                        setLast(true);
                    }
                },
            },
        );
    };

    const onSelected: AnswerSelected = (e) => {
        const answer = options.current?.querySelector<HTMLInputElement>(`input[name="answer"]:checked`);
        setSelected((e.target as HTMLInputElement).id);
        setCheck(!!answer);
    };

    useEffect(() => {
        setCheck(false);
    }, [current]);

    useEffect(() => {
        const idx = questions.findIndex((item) => item.answer_histories.length == 0);
        if (0 > idx) {
            setFinish(true);
            return;
        }
        setCurrent(idx);
    }, []);

    if (isFinish) return <FinishMenu quizH={quizH} />;

    return (
        <main className="min-h-screen w-full">
            <Head title="Quiz" />

            <section className="flex h-screen flex-col justify-between overflow-hidden border-2">
                <div className="m-4 flex h-full flex-col items-center lg:flex-row">
                    <h1 className="mx-auto mt-12 flex h-80 w-11/12 justify-center overflow-auto rounded-sm p-6 text-center text-xl font-medium sm:items-center">
                        {currentQuestion.question}
                    </h1>
                    <form ref={options} className="mx-auto flex w-11/12 flex-col gap-4 p-2">
                        {currentQuestion.answers.map((option, index) => (
                            <AnswerInput key={option.id} answer={option.detail} value={option.id} onSelected={onSelected} />
                        ))}
                    </form>
                </div>
                <div className="fixed bottom-0 flex w-screen justify-between justify-self-end bg-transparent p-4">
                    <p className="rounded-sm bg-black px-4 py-2 text-xl text-white dark:bg-white dark:text-black">
                        Question <span className="text-2xl font-black">{current + 1}</span>/{questions.length}
                    </p>
                    <button
                        disabled={!isCheck}
                        className="cursor-pointer rounded-sm bg-purple-900 px-4 py-2 text-white duration-100 hover:scale-95 disabled:bg-gray-500"
                        onClick={onNext}
                    >
                        {questions.length - 1 == current ? 'Finish!' : 'Next'}
                    </button>
                </div>
            </section>
        </main>
    );
}
