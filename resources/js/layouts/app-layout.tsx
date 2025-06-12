import Sidebar, { Navigation } from '@/components/ui/sidebar';
import { type BreadcrumbItem } from '@/types';
import { Link } from '@inertiajs/react';
import { History, Home, LucideCoffee, PanelLeftIcon } from 'lucide-react';
import { useState, type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

const navigation: Navigation[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
        icon: Home,
    },
    {
        title: 'Explore',
        href: route('quiz.explore'),
        icon: LucideCoffee,
    },
    {
        title: 'History',
        href: route('quiz.history'),
        icon: History,
    },
];

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
    const [trigger, setTrigger] = useState(false);
    return (
        <Sidebar
            isOpen={trigger}
            onClose={() => {
                setTrigger(false);
            }}
            navigation={navigation}
        >
            <nav className="fixed top-0 left-0 flex h-14 w-full items-center bg-white dark:bg-[#0a0a0a]">
                <PanelLeftIcon
                    className="block cursor-pointer hover:text-slate-800/20 md:hidden"
                    onClick={() => {
                        setTrigger(true);
                    }}
                />
                <h1 className="p-2 text-xl font-extrabold sm:ml-18">
                    {breadcrumbs?.map((item, idx) => (
                        <Link href={item.href} className={idx != breadcrumbs.length - 1 ? 'text-md font-normal' : ''} key={idx}>
                            {idx != breadcrumbs.length - 1 ? item.title.toLowerCase() : item.title}{' '}
                            {idx != breadcrumbs.length - 1 ? <span className="font-bold"> / </span> : ''}
                        </Link>
                    ))}
                </h1>
            </nav>
            <main className="bg-neutr mt-16 sm:ml-18">{children}</main>
        </Sidebar>
    );
};
