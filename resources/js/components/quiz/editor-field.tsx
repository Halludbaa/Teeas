import { Answer, Question } from '@/model/quiz_model';
import { Link, router } from '@inertiajs/react';
import { XIcon } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { AddAnswer } from './add-question';

interface QuestionEditorProps {
    question: Question;
    onBlur: FormEventHandler;
    onChange: FormEventHandler;
    idx: number;
}

interface AnswerEditorProps {
    question: Question;
    answer: Answer;
    onBlur: FormEventHandler;
    onChange: FormEventHandler;
    idx: number;
}

export function AnswerEditorField({ question, answer, onBlur, onChange, idx }: AnswerEditorProps) {
    const [onEdit, setEdit] = useState(false);
    return (
        <div className="group flex w-full cursor-pointer flex-row gap-2">
            <div
                className="questions-center flex min-h-10 w-full flex-row justify-center rounded-lg bg-slate-300/30 p-2 dark:bg-gray-400/25"
                id={question.id}
            >
                {onEdit ? (
                    <textarea
                        name="answer"
                        id={answer.id}
                        className="box-border w-full resize-none outline-0"
                        value={answer.detail}
                        onBlur={(e) => {
                            onBlur(e);
                            setEdit(!onEdit);
                        }}
                        onChange={onChange}
                    />
                ) : (
                    <p className="w-full whitespace-pre-line" onClick={() => setEdit(!onEdit)}>
                        {answer.detail}
                    </p>
                )}
                <input
                    type="radio"
                    name={`right_answer_${question.id}`}
                    id={answer.id}
                    checked={answer.id == question.right_answer_id}
                    onChange={onChange}
                />
            </div>
            {![0, 1].includes(idx) ? (
                <Link
                    href={route('answer.destroy')}
                    method="delete"
                    async={true}
                    preserveScroll={true}
                    onSuccess={() => {
                        router.get(route('quiz.create', question.quiz_id), {}, { async: true, preserveScroll: true });
                    }}
                    data={{ id: answer.id }}
                    className="cursor-pointer opacity-0 duration-100 group-hover:opacity-100"
                >
                    <XIcon />
                </Link>
            ) : (
                <div className="h-[24px] w-[24px]"></div>
            )}
        </div>
    );
}

export function QuestionEditorField({ question, onBlur, onChange, idx }: QuestionEditorProps) {
    const [onEdit, setEdit] = useState(false);

    return (
        <div key={question.id} className="flex h-max w-full flex-col gap-3 rounded-xl bg-slate-300/15 p-4 text-xl">
            <div className="flex flex-row">
                {onEdit ? (
                    <textarea
                        id={question.id}
                        name="question"
                        className="box-border max-h-fit w-full resize-none outline-0"
                        value={question.question}
                        onBlur={(e) => {
                            onBlur(e);
                            setEdit(!onEdit);
                        }}
                        onChange={onChange}
                    />
                ) : (
                    <p className="w-full whitespace-pre-line" onClick={() => setEdit(!onEdit)}>
                        {question.question}
                    </p>
                )}
                {idx != 0 ? (
                    <Link
                        href={route('question.destroy')}
                        method="delete"
                        async={true}
                        preserveScroll={true}
                        onSuccess={() => {
                            router.get(route('quiz.create', question.quiz_id), {}, { async: true, preserveScroll: true });
                        }}
                        data={{ id: question.id }}
                        className="cursor-pointer"
                    >
                        <XIcon />
                    </Link>
                ) : (
                    ''
                )}
            </div>
            {question.answers.map((answer, idx) => (
                <AnswerEditorField key={idx} idx={idx} question={question} answer={answer} onBlur={onBlur} onChange={onChange} />
            ))}
            {question.answers.length < 4 ? <AddAnswer quiz_id={question.quiz_id} question_id={question.id} /> : ''}
        </div>
    );
}
