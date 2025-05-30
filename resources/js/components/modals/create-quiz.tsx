import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Link, useForm } from '@inertiajs/react';
import { X } from 'lucide-react';
import React, { FormEventHandler, useState } from 'react';

interface ModalsProps {
    isOpen: boolean;
    children: React.ReactNode;
    onClose: () => void;
    title: string;
}

export interface CreateQuizModals {
    isOpen: boolean;
    onClose: () => void;
}

interface CreateQuizForm {
    name: string;
}

export function Modals({ isOpen, onClose, children, title }: ModalsProps) {
    return (
        <div
            onClick={onClose}
            className={`fixed inset-0 top-0 left-0 z-[60] flex h-screen w-screen items-center justify-center transition-colors ${isOpen ? 'visible bg-black/70' : 'invisible'}`}
        >
            <div className="dark:bg-sidebar -mt-80 flex w-3/4 flex-col gap-6 rounded-xl bg-white p-4 md:w-1/2" onClick={(e) => e.stopPropagation()}>
                <div className="flex w-full flex-row justify-between">
                    <h1>{title}</h1>
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
}

export function AreYouSure({ isOpen, onClose, id }: AreYouSureProps) {
    const [onProgress, setProgress] = useState(false);

    return (
        <Modals isOpen={isOpen} onClose={onClose} title="Are You Sure?">
            <div className="flex flex-row justify-center gap-4">
                <button className="cursor-pointer rounded-lg bg-gray-400/50 px-4 py-2 font-bold text-white" onClick={onClose}>
                    Cancel
                </button>
                <Link
                    href={route('quiz.destroy')}
                    className="cursor-pointer rounded-lg bg-red-500 px-4 py-2 font-bold text-white disabled:bg-red-50/30"
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
        <Modals isOpen={isOpen} onClose={onClose} title="Create Quiz">
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
