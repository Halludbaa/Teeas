import { AddQuestion } from '@/components/quiz/add-question';
import { QuestionEditorField } from '@/components/quiz/editor-field';
import { QuizDetail } from '@/components/quiz/quiz-detai';
import AppLayout from '@/layouts/app-layout';
import { Quiz } from '@/model/quiz_model';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { useImmer } from 'use-immer';
import { updateAnswer, updateQuestion, updateRightAnswer } from './ajax/quiz-create';

interface QuizCreateProps {
    quiz: Quiz;
}

export default function QuizCreate({ quiz }: QuizCreateProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `Create`,
            href: route('quiz.create', quiz.id),
        },
    ];

    const [dataQuiz, setQuiz] = useImmer<Quiz>(quiz);
    const reload = () => {
        setQuiz(quiz);
    };

    const handleChange: FormEventHandler = (e) => {
        const target = e.target as HTMLInputElement;
        if (target.name == 'question') {
            setQuiz((draft) => {
                const idx = draft.questions.findIndex((element) => element.id == target.id);
                draft.questions[idx].question = target.value;
            });
        }

        if (target.name[0] == 'r') {
            //right answer
            setQuiz((draft) => {
                const idx = draft.questions.findIndex((element) => element.id == (target.parentNode as HTMLElement).id);
                draft.questions[idx].right_answer_id = target.id;
            });

            updateRightAnswer((target.parentNode as HTMLElement)?.id, target.id);
        }

        if (target.name == 'answer') {
            setQuiz((draft) => {
                const inQuestion = draft.questions.findIndex((element) => element.id == (target.parentNode as HTMLElement)?.id);
                const idx = draft.questions[inQuestion].answers.findIndex((element) => element.id == target.id);
                draft.questions[inQuestion].answers[idx].detail = target.value;
            });
        }
    };

    const handleBlur: FormEventHandler = (e) => {
        const target = e.target as HTMLInputElement;

        if (target.name == 'question') {
            updateQuestion(target.value, target.id);
        }

        if (target.name == 'answer') {
            updateAnswer(target.value, target.id);
        }
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Quiz" />
            <QuizDetail quiz={quiz} />
            <main className="flex h-full w-full flex-col gap-4 p-4">
                {dataQuiz.questions.map((item, idx) => {
                    return <QuestionEditorField key={idx} idx={idx} question={item} onBlur={handleBlur} onChange={handleChange} />;
                })}
                <AddQuestion quiz_id={quiz.id} />
            </main>
        </AppLayout>
    );
}
