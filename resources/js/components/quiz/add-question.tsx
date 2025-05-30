import { createQuestion } from '@/pages/quiz/ajax/quiz-create';
import { Plus } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

interface AddQuestionProps {
    quiz_id: string;
}

export function AddQuestion({ quiz_id }: AddQuestionProps) {
    const [onCreate, setCreate] = useState(false);
    const [question, setQuestion] = useState('');

    const handleClick: FormEventHandler = (e) => {
        setCreate(true);
    };

    const handleBlur: FormEventHandler = (e) => {
        setCreate(false);
    };

    const handleEnter: FormEventHandler = (e) => {
        const target = e.target as HTMLInputElement;
        if (e.key != 'Enter') return;

        if (target.value != '') {
            createQuestion(target.value, quiz_id);
        }
        setCreate(false);
    };

    const handleChange: FormEventHandler = (e) => {
        setQuestion((e.target as HTMLInputElement).value);
    };

    if (onCreate)
        return (
            <div className="flex h-max w-full flex-row gap-3 rounded-xl bg-slate-300/15 p-4 text-xl">
                <input
                    type="text"
                    autoFocus={true}
                    name="new_question"
                    id="new_question"
                    value={question}
                    className="box-border w-full resize-none outline-0"
                    onKeyDown={handleEnter}
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
            </div>
        );

    return (
        <div className="flex h-max w-full flex-row gap-3 rounded-xl bg-slate-300/15 p-4 text-xl" onClick={handleClick}>
            <Plus /> New Question
        </div>
    );
}
