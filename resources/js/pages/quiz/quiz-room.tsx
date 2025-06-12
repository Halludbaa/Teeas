import AnswerInput, { AnswerSelected } from '@/components/quiz/answer-input';
import { QuizHistory } from '@/model/quiz_model';
import { Head, router } from '@inertiajs/react';
import { ArrowBigRightDashIcon } from 'lucide-react';
import { FormEventHandler, useEffect, useRef, useState } from 'react';
import FinishMenu from './finish-menu';

type NextQuestion = FormEventHandler;

interface QuizRoomProps {
    quizH: QuizHistory;
}

interface LoadingProps {
    isLoading: boolean;
}
function DotAnimation() {
    return (
        <span className="flex flex-row">
            <span className="animate-bounce delay-75">.</span>
            <span className="animate-bounce delay-[80ms]">.</span>
            <span className="animate-bounce delay-[85ms]">.</span>
        </span>
    );
}
function LoadingView({ isLoading }: LoadingProps) {
    return (
        <div
            className={
                'fixed z-[100] flex h-screen w-screen flex-row items-center justify-center gap-1 bg-black text-4xl font-bold text-white transition-all duration-500 ' +
                (isLoading ? 'top-0' : '-top-full')
            }
        >
            Wait <DotAnimation />
        </div>
    );
}
export default function QuizRoom({ quizH }: QuizRoomProps) {
    //Shuffle Quiz
    const [isFirst, setFirst] = useState<boolean>(false);
    (() => {
        if (!isFirst) {
            quizH.quiz.questions.map((item) => item.answers.sort(() => Math.random() - 0.5));
            setFirst(true);
        }
    })();

    const [current, setCurrent] = useState<number>(0);
    const [selected, setSelected] = useState('');
    const [isCheck, setCheck] = useState<boolean>(true);
    const [loading, setLoading] = useState(false);

    const questions = quizH.quiz.questions;
    const options = useRef<HTMLFormElement>(null);
    const currentQuestion = questions[current];

    const [isFinish, setFinish] = useState<boolean>(quizH.status == 'finished');
    const [isLast, setLast] = useState<boolean>(questions.length == current + 1);

    const onNext: NextQuestion = (e) => {
        setCheck(false);
        setLoading(true);
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
                    setLoading(false);
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

        if (idx + 1 == questions.length) {
            setLast(true);
        }

        setCurrent(idx);
    }, []);

    if (isFinish)
        return (
            <>
                <LoadingView isLoading={loading} />
                <FinishMenu quizH={quizH} />;
            </>
        );

    return (
        <>
            <LoadingView isLoading={loading} />

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
                            className="scale-120 cursor-pointer rounded-sm bg-purple-900 px-4 py-2 text-white duration-100 hover:scale-95 disabled:bg-gray-500"
                            onClick={onNext}
                        >
                            {/* {questions.length - 1 == current ? 'Finish!' : 'Next'} */}
                            <ArrowBigRightDashIcon />
                        </button>
                    </div>
                </section>
            </main>
        </>
    );
}
