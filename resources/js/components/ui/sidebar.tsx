import {  LucideIcon, MessageCircleQuestionIcon, Settings, Settings2, Settings2Icon, SettingsIcon } from "lucide-react";
import AppLogoIcon from "../app-logo-icon";
import { ReactNode } from "react";
import { Link } from "@inertiajs/react";
export interface Navigation {
  title: string;
  href: string;
  icon: LucideIcon;
}

interface SidebarProps {
    children: ReactNode;
    navigation?: Navigation[];
}

export default function Sidebar({ children, navigation}: SidebarProps) {
  return (
      <>
          <aside className="fixed top-0 z-10 h-screen w-16 bg-white py-2 text-white shadow-xl dark:bg-sidebar hidden sm:block">
            <ul className="flex h-full w-full flex-col items-center justify-start gap-4">
                <li className="">
                    <Link href="/quiz" className="flex h-10 w-10 items-center justify-center rounded-full dark:hover:bg-gray-600/50 dark:bg-white hover:bg-gray-200 bg-black group p-2 scale-110">
                        <AppLogoIcon className="fill-white group-hover:fill-black dark:group-hover:fill-white dark:fill-black" />
                    </Link>
                </li>
                {navigation?.map((items, idx) => (
                  <li className="" key={idx}>
                    <Link href={items.href} className="flex h-10 w-10 p-1 items-center justify-center rounded-full scale-110 hover:bg-gray-200 dark:hover:bg-gray-600/50 dark:text-white text-black">
                        <items.icon  />
                    </Link>
                  </li>
                ))}
                <li className="mt-auto">
                    <Link href="/settings" className="flex h-10 w-10 scale-110 p-1 hover:bg-gray-100 dark:hover:bg-gray-600/50 text-black dark:text-white  items-center justify-center rounded-full">
                        <SettingsIcon />
                    </Link>
                </li>
            </ul>
        </aside>
        {children}
    </>
  )
}