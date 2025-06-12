import { Link } from '@inertiajs/react';
import MainLayout from './quiz/main-layout';

export default function MainPage() {
    return (
        <MainLayout>
            <div className="items flex h-[45rem] w-full flex-col-reverse items-center justify-center border-b-2 p-12 md:flex-row">
                <h1 className="flex flex-col font-bold">
                    <span className="text-5xl">Build Your Own Quiz</span>
                    <span className="text-5xl">and Share it later</span>
                    <p className="w-full text-lg font-medium break-words">
                        Don't forget to drink your tea, <br />
                        and share your quiz to your friends
                    </p>

                    <div className="mt-2 flex flex-row gap-2">
                        <Link className="cursor-pointer rounded-xl bg-blue-500 px-4 py-2 text-lg font-semibold text-white" href={route('dashboard')}>
                            Build Now!
                        </Link>
                        <Link
                            className="cursor-pointer rounded-xl border-2 bg-blue-500/20 px-4 py-2 text-lg font-semibold text-blue-500"
                            href={route('dashboard')}
                        >
                            {' '}
                            Get Your Tea
                        </Link>
                    </div>
                </h1>
                <div
                    className="animate-breathing h-[25rem] w-[25rem] bg-cover bg-center transition-all duration-200 duration-1000 md:ml-52"
                    style={{ backgroundImage: `url('/storage/image/tea_icon.png')` }}
                ></div>
            </div>
        </MainLayout>
    );
}
