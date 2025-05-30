import { AreYouSure } from '@/components/modals/create-quiz';
import AppLayout from '@/layouts/app-layout';
import { QuizHistory } from '@/model/quiz_model';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import moment from 'moment';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface HistoryProps {
    history: QuizHistory[];
}

export default function History({ history }: HistoryProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [historyID, setHistory] = useState('');
    const openModals = (id: string) => {
        setHistory(id);
        setIsOpen(!isOpen);
    };

    return (
        <>
            <AreYouSure isOpen={isOpen} onClose={() => setIsOpen(false)} id={historyID} />
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Dashboard" />

                <section className="flex w-full flex-col gap-2">
                    {history.map((quizH, index) => (
                        <div key={index} className="flex w-full flex-row items-center justify-between rounded-lg bg-slate-600/10 p-4">
                            <div>
                                <Link href={route('quiz.play', quizH.id)} className="text-xl font-bold">
                                    {quizH.quiz.name}
                                </Link>
                                <p>by: {quizH.quiz.user.name}</p>
                            </div>
                            <div className="flex flex-row gap-2">
                                <p>{moment(quizH.created_at).fromNow()}</p>
                                <button
                                    className="cursor-pointer"
                                    onClick={(e) => {
                                        openModals(quizH.id);
                                    }}
                                >
                                    <Trash2 className="text-red-400" />
                                </button>
                            </div>
                        </div>
                    ))}
                </section>
            </AppLayout>
        </>
    );
}
