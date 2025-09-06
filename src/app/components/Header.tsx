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
    <header className="fixed top-0 left-0 lg:left-64 w-full lg:w-[calc(100%-16rem)] bg-[#6e1e2a] backdrop-blur-md border-b border-white/10 px-4 py-3 z-40 shadow-lg">
      <div className="flex justify-between items-center gap-3">
        
        {/* Título del sistema - visible en pantallas medianas y grandes */}
        <div className="hidden md:block flex-1">
          <h1 className="text-white font-bold tracking-wide text-sm lg:text-base xl:text-lg truncate uppercase">
            Sistema Integral de Recursos Humanos
          </h1>
          <p className="text-white/70 text-xs lg:text-sm">
            {sistema || 'INJUVE'}
          </p>
        </div>

        {/* Logo/Título compacto para móviles */}
        <div className="md:hidden flex items-center gap-2">
          <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">IJ</span>
          </div>
          <span className="text-white font-semibold text-sm">SIRH</span>
        </div>

        {/* Info del usuario */}
        <div className="flex items-center gap-2">
          <ButtonHeader user={user!} />
        </div>
      </div>
    </header>
  );
};