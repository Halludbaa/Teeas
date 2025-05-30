import { Answer, Question } from '@/model/quiz_model';
import { Link } from '@inertiajs/react';
import { XIcon } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

interface QuestionEditorProps {
    question: Question;
    onBlur: FormEventHandler;
    onChange: FormEventHandler;
}

interface AnswerEditorProps {
    question: Question;
    answer: Answer;
    onBlur: FormEventHandler;
    onChange: FormEventHandler;
}

export function AnswerEditorField({ question, answer, onBlur, onChange }: AnswerEditorProps) {
    const [onEdit, setEdit] = useState(false);
    return (
        <div className="questions-center flex min-h-10 flex-row justify-center rounded-lg bg-slate-300/30 p-2 dark:bg-gray-400/25" id={question.id}>
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
    );
}

export function QuestionEditorField({ question, onBlur, onChange }: QuestionEditorProps) {
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
                <Link href={'/'} method="post">
                    <XIcon />
                </Link>
            </div>
            {question.answers.map((answer, idx) => (
                <AnswerEditorField key={idx} question={question} answer={answer} onBlur={onBlur} onChange={onChange} />
            ))}
        </div>
    );
}
