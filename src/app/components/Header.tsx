

import { getServerSession } from 'next-auth';
import Image from 'next/image'
import { authOptions } from '../api/auth/[...nextauth]/route';
import  { IoPerson } from "react-icons/io5";
import { LogoutButton } from '.';

const sistema = process.env.NOMBRE_SISTEMA;

export const Header = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user?.name;

  return (
    <header>
      <nav className="bg-primary-900 border-b-4 border-gray- px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto">
          <Image src={"/assets/logo-blanco.png"} alt="logo" width={225} height={100} className="" />
          <div className="flex items-center lg:order-2">
            <IoPerson className="w-5 h-5 text-white -mr-2"/>
            <span className="text-white font-medium text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 uppercase">
             { user }
            </span>
            <LogoutButton/>
            
            {/* <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                    <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button> */}
          </div>
          <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
            <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white text-white  uppercase">{sistema}</span>
          </div>
        </div>
      </nav>
    </header>
  )
}
