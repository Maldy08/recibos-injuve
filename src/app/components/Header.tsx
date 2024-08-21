import { getServerSession } from 'next-auth';
import Image from 'next/image';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { ButtonHeader } from '.';

const sistema = process.env.NOMBRE_SISTEMA;

export const Header = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user?.name;

  return (
    <header className="lg:fixed lg:top-0 lg:left-64 lg:w-[calc(100%-16rem)] w-full bg-primary-900 border-b-4 border-gray- px-4 lg:px-6 py-2.5 z-30">
      <nav>
        <div className="flex flex-wrap justify-between items-center mx-auto">
          {/* Imagen solo visible en pantallas pequeñas */}
          <div className="block lg:hidden">
            <Image src={"/assets/logo-blanco.png"} alt="logo" width={225} height={100} className="" />
          </div>

          <div className="lg:order-2">
            <ButtonHeader user={user!} />
          </div>
          
          <div className="justify-between items-center w-full flex lg:w-auto lg:order-1" id="mobile-menu-2">
            <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white text-white uppercase">
              {sistema}
            </span>
          </div>
        </div>
      </nav>
    </header>
  );
}
