import { ImageIcon } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

interface QuizDetailProps {
    name: string;
    banner: string;
}

export function QuizDetail({ name, banner }: QuizDetailProps) {
    const [onEdit, setEdit] = useState(false);
    const [quizName, setQuizName] = useState(name);

    const handleChange: FormEventHandler = (e) => {
        setQuizName((e.target as HTMLInputElement).value);
    };
    const editToggle: FormEventHandler = (e) => {
        setEdit(!onEdit);
    };

    return (
        <section>
            <div
                className={`bg-[url(/storage/uploads/${banner})] bg-background mb-2 min-h-50 w-full bg-contain`}
                style={{ backgroundImage: `url("/storage/uploads/${banner}")` }}
            >
                {/*  */}
            </div>
            <form action="#" className="flex w-full flex-row gap-2 px-6 py-1 text-4xl font-bold">
                {onEdit ? (
                    <input
                        type="text"
                        value={quizName}
                        className="w-full outline-0"
                        name="name"
                        placeholder="Enter Quiz Name"
                        onBlur={editToggle}
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
            </form>
        </section>
    );
}
