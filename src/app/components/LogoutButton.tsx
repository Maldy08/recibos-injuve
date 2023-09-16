'use client';

import { signOut, useSession } from 'next-auth/react';
import { IoExitOutline } from 'react-icons/io5';

export const LogoutButton = () => {
    const { data: session, status } = useSession();
    console.log(status)
    return (
        status === 'loading' ?
            <><span className='text-white mr-2 text-sm'>Cargando...</span></>
            :

            <button
                className=''
                onClick={async() => await signOut()}
            >
                <IoExitOutline className="w-6 h-6 text-white mr-2  " />
            </button>
    )
}
