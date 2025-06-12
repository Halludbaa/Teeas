import { QuizCard } from '@/components/quiz/quiz-card';
import AppLayout from '@/layouts/app-layout';
import { ShowQuiz } from '@/model/quiz_model';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';

interface ExploreProps {
    media: ShowQuiz[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Explore',
        href: '/explore',
    },
];
export default function Explore({ media }: ExploreProps) {
    useEffect(() => {
        media.sort(() => Math.random() - 0.5);
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Explore" />
            <section className="grid w-full grid-cols-1 gap-2 p-4 sm:grid-cols-2 md:grid-cols-3">
                {media.map((item, index) => (
                    <QuizCard key={index} quiz={item} display={false} />
                ))}
            </section>
        </AppLayout>
    );
}
