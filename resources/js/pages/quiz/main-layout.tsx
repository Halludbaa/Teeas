import { User } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ReactNode } from 'react';

interface MainLayoutProps {
    children: ReactNode;
}
interface AuthProps {
    user: User;
}
export default function MainLayout({ children }: MainLayoutProps) {
    const { auth } = usePage().props;

    return (
        <>
            <nav className="dark:bg-sidebar fixed top-0 flex h-18 w-screen items-center bg-white p-4 text-black shadow dark:text-white">
                <div className="h-20 w-20 bg-cover bg-center" style={{ backgroundImage: `url('/storage/image/tea_icon.png')` }}></div>
                <ul className="ml-auto hidden justify-between gap-4 text-xl md:flex md:flex-row">
                    <li>
                        <a href="#" className="rounded-lg px-2 py-1 transition-colors duration-150 hover:bg-slate-200 hover:text-black">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="#" className="rounded-lg px-2 py-1 transition-colors duration-150 hover:bg-slate-200 hover:text-black">
                            About Us
                        </a>
                    </li>
                    <li>
                        <a href="#" className="rounded-lg px-2 py-1 transition-colors duration-150 hover:bg-slate-200 hover:text-black">
                            Build
                        </a>
                    </li>
                </ul>
                <div className="ml-auto flex flex-row gap-2">
                    {(auth as AuthProps).user ? (
                        <Link href={route('dashboard')} className="text-md cursor-pointer rounded-xl bg-blue-500 px-4 py-2 font-semibold text-white">
                            Go to Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('register')}
                                className="text-md cursor-pointer rounded-xl border-2 bg-blue-500/20 p-2 font-semibold text-blue-500"
                            >
                                Sign Up
                            </Link>
                            <Link href={route('login')} className="text-md cursor-pointer rounded-xl bg-blue-500 p-2 font-semibold text-white">
                                Sign In
                            </Link>
                        </>
                    )}
                </div>
            </nav>
            <main className="mt-18 mb-[50rem]">{children}</main>
            <footer className="flex w-full border-t-2 p-0">
                <p className="mb-0 w-full text-center text-[35rem] font-black">Teez</p>
            </footer>
        </>
    );
}
