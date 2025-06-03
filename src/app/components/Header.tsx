import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { ButtonHeader } from ".";
import { FaUserCircle } from "react-icons/fa";

const sistema = process.env.NOMBRE_SISTEMA;

export const Header = async () => {
  const session = await getServerSession(authOptions);
  const user =
    session?.user?.name + " " + session?.user?.appat + " " + session?.user?.apmat;

  return (
<header className="fixed top-0 left-64 w-[calc(100%-16rem)] bg-primary-900 backdrop-blur-md border-b border-white/10 px-4 py-3 z-40 shadow-md">
  <div className="flex flex-wrap justify-between items-center gap-3">
    
    {/* Título adaptable */}
    <span className="text-white  font-bold tracking-wide text-base lg:text-sm sm:text-lg md:text-xl truncate max-w-[60%] sm:max-w-none uppercase">
      SISTEMA INTEGRAL DE RECURSOS HUMANOS
    </span>

    {/* Info del usuario con truncado */}
    <div className="flex items-center gap-2 ml-auto">

      <ButtonHeader user={user!} />
    </div>
  </div>
</header>
  );
};