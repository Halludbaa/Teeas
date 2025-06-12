import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Link, useForm } from '@inertiajs/react';
import { X } from 'lucide-react';
import React, { FormEventHandler, useState } from 'react';

interface ModalsProps {
    isOpen: boolean;
    children: React.ReactNode;
    onClose: () => void;
    className: string;
    title: string;
}

export interface CreateQuizModals {
    isOpen: boolean;
    onClose: () => void;
}

interface CreateQuizForm {
    name: string;
}

export function Modals({ isOpen, onClose, children, title, className }: ModalsProps) {
    return (
        <div onClick={onClose} className={`modals ${isOpen ? 'visible bg-black/70' : 'invisible'}`}>
            <div className={'dark:bg-sidebar -mt-80 flex flex-col gap-6 rounded-xl bg-white p-4 ' + className} onClick={(e) => e.stopPropagation()}>
                <div className="flex w-full flex-row justify-between">
                    <h1 className="text-xl font-black">{title}</h1>
                    <button onClick={onClose} className="flex scale-70 items-center justify-center self-end">
                        <X className="scale-150" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}
interface AreYouSureProps {
    isOpen: boolean;
    onClose: () => void;
    id: string;
    history?: boolean;
}

export function AreYouSure({ isOpen, onClose, id, history = true }: AreYouSureProps) {
    const [onProgress, setProgress] = useState(false);

    return (
        <Modals isOpen={isOpen} onClose={onClose} title="Are You Sure?" className="w-max md:w-1/4">
            <div className="flex w-full flex-row items-center justify-between gap-1">
                <button className="cursor-pointer rounded-lg bg-gray-400/50 px-4 py-2 font-bold text-white" onClick={onClose}>
                    Cancel
                </button>
                or
                <Link
                    href={route(history ? 'quiz.destroy' : 'quiz.delete')}
                    className="cursor-pointer rounded-lg bg-red-500 px-4 py-2 font-bold text-white disabled:bg-gray-400/50 dark:disabled:bg-red-50/30"
                    method="delete"
                    data={{ id: id }}
                    async={true}
                    onClick={() => {
                        setProgress(true);
                    }}
                    disabled={onProgress}
                    onSuccess={() => {
                        onClose();
                        setProgress(false);
                    }}
                >
                    Delete
                </Link>
            </div>
        </Modals>
    );
}

export default function CreateQuizModals({ isOpen, onClose }: CreateQuizModals) {
    const { data, setData, post, errors, reset } = useForm<Required<CreateQuizForm>>({
        name: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('quiz.store'), {
            onFinish: () => {
                reset('name');
                onClose();
            },
        });
    };

    return (
        <Modals isOpen={isOpen} onClose={onClose} title="Create Quiz" className="create-quiz-modals">
            <form onSubmit={submit}>
                <div className="grid gap-2">
                    <Input
                        id="quiz_name"
                        type="text"
                        required
                        autoFocus
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="Enter Quiz Name"
                    />
                    <InputError message={errors.name} />
                </div>
            </form>
        </Modals>
    );
}
