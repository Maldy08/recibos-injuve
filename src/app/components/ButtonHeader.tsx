'use client';

import { ChevronDownIcon, UserCircleIcon } from "@heroicons/react/20/solid"
import { signOut } from "next-auth/react";
import { useState } from "react";

interface ButtonHeaderProps {
    user: string
}

export const ButtonHeader = ({ user }: ButtonHeaderProps) => {
    const [open, setOpen] = useState(true);

    return (
        <>
            <button
                type="button"
                className='inline-flex w-full justify-between gap-x-1.5 rounded-md bg-slate-100 px-3 py-1 
                    text-xs text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                onClick={() => setOpen(!open)}
            >
                <UserCircleIcon className="-mr-1 h-6 w-5 text-gray-400" />
                <span className='uppercase p-1'>{user}</span>

                <ChevronDownIcon className="-mr-1 h-6 w-5 text-gray-400" />
            </button>


            <ul
                className={`transition-opacity ease-in duration-150 ${!open ? "opacity-100" : "opacity-0"} absolute w-40 py-1 mt-2  bg-gray-100 border border-gray-200 
                    rounded-md shadow-lg dark:bg-gray-700 dark:border-gray-600 z-10`}

            >

                <li>
                    <a href="#" onClick={ async () => await signOut() } className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-600" >Cerrar sesión</a>
                </li>
            </ul>
        </>
    )
}