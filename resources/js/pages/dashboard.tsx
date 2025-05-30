import CreateQuizModals from '@/components/modals/create-quiz';
import { QuizCard } from '@/components/quiz/quiz-card';
import AppLayout from '@/layouts/app-layout';
import { ShowQuiz } from '@/model/quiz_model';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface DashboardProps {
    quiz: ShowQuiz[];
}

export default function Dashboard({ quiz }: DashboardProps) {
    const [isOpen, setIsOpen] = useState(false);

    const openModals = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <CreateQuizModals isOpen={isOpen} onClose={() => setIsOpen(false)} />
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Dashboard" />
                <button className="flex w-max cursor-pointer flex-row gap-2 rounded-lg p-2 font-bold" onClick={openModals}>
                    <Plus /> Create
                </button>

                <section className="grid w-full grid-cols-1 gap-2 p-4 sm:grid-cols-2 md:grid-cols-3">
                    {quiz.map((item, index) => (
                        <QuizCard key={index} quiz={item} />
                    ))}
                </section>
            </AppLayout>
        </>
    );
}
