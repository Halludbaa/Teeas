import {  LucideIcon, MessageCircleQuestionIcon, Settings, Settings2, Settings2Icon, SettingsIcon, XIcon } from "lucide-react";
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
    isOpen: boolean
    onClose: () => void;
}

export default function Sidebar({ children, navigation, onClose, isOpen}: SidebarProps) {
  return (
      <>  
          <aside className={"h-screen w-screen md:hidden flex flex-col fixed top-0 z-50 bg-white dark:bg-sidebar p-4 transition-all duration-500 " + (isOpen ? "left-0" : "-left-[200%]")}>
            <div className=" flex flex-row gap-4 items-center p-2"><AppLogoIcon /> <h1 className="font-black text-2xl">Teez</h1> <XIcon className="ml-auto" onClick={onClose}/></div>
            <ul className="flex flex-col">

            {navigation?.map((items, idx) => (
                  <li className="" key={idx}>
                    <Link href={items.href} className="flex flex-row gap-2 p-4 rounded-lg scale-110 hover:bg-gray-200 dark:hover:bg-gray-600/50 dark:text-white text-black">
                        <items.icon  /> {items.title}
                    </Link>
                  </li>
                ))}
            </ul>

          </aside>
          <aside className="fixed top-0 z-10 h-screen w-16 bg-white py-2 text-white shadow-xl dark:bg-sidebar hidden sm:block">
            <ul className="flex h-full w-full flex-col items-center justify-start gap-4">
                <li className="">
                    <Link href={route("dashboard")} className="">
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