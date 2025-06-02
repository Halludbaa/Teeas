import { Quiz } from '@/model/quiz_model';
import { router } from '@inertiajs/react';
import { ImageIcon, Trash2 } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { AreYouSure } from '../modals/create-quiz';

interface QuizDetailProps {
    quiz: Quiz;
}

export function QuizDetail({ quiz }: QuizDetailProps) {
    const [onEdit, setEdit] = useState(false);
    const [quizName, setQuizName] = useState(quiz.name);

    const [isOpen, setIsOpen] = useState(false);
    const [quizID, setQuizId] = useState('');
    const openModals = (id: string) => {
        setQuizId(id);
        setIsOpen(!isOpen);
    };

    const handleChange: FormEventHandler = (e) => {
        setQuizName((e.target as HTMLInputElement).value);
    };

    const editToggle: FormEventHandler = (e) => {
        setEdit(!onEdit);
        // ((e.target as HTMLInputElement).parentNode as HTMLFormElement).submit();
    };

    const submit: FormEventHandler = (e) => {
        setEdit(!onEdit);
        router.patch(
            route('quiz.update'),
            {
                name: quizName,
                id: quiz.id,
            },
            { async: true, preserveScroll: true },
        );
    };

    return (
        <>
            <AreYouSure history={false} isOpen={isOpen} onClose={() => setIsOpen(false)} id={quizID} />
            <section>
                <div
                    className={`bg-[url(/storage/uploads/${quiz.banner})] bg-background mb-2 min-h-50 w-full bg-contain`}
                    style={{ backgroundImage: `url("/storage/uploads/${quiz.banner}")` }}
                >
                    {/*  */}
                </div>
                <div className="flex w-full flex-row items-center gap-2 px-6 py-1 text-4xl font-bold">
                    {onEdit ? (
                        <input
                            type="text"
                            value={quizName}
                            className="w-full outline-0"
                            name="name"
                            placeholder="Enter Quiz Name"
                            onBlur={(e) => {
                                submit(e);
                            }}
                            onKeyUp={(e) => {
                                if (e.key.toLowerCase() == 'enter') {
                                    submit(e);
                                }
                            }}
                            onChange={handleChange}
                        />
                    ) : (
                        <p className="w-full" onDoubleClick={editToggle}>
                            {quizName}
                        </p>
                    )}

                    <label htmlFor="banner" className="textscale-120 flex cursor-pointer flex-row gap-1 text-lg">
                        <ImageIcon /> Change
                        <input type="file" className="hidden" name="banner" id="banner" />
                    </label>
                    <button
                        className="cursor-pointer"
                        onClick={(e) => {
                            openModals(quiz.id);
                        }}
                    >
                        <Trash2 className="text-red-400" />
                    </button>
                </div>
            </section>
        </>
    );
}
