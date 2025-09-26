import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Image from "next/image";
import Link from "next/link";
import { 
  LuUsers, 
  LuReceipt, 
  LuCalendarDays, 
  LuBellRing, 
  LuFileText,
  LuTrendingUp,
  LuClock,
  LuCheckCircle 
} from "react-icons/lu";

export const metadata = {
  title: 'INJUVE - Sistema Integral de Recursos Humanos',
  description: 'Panel Principal - Sistema de Recursos Humanos INJUVE',
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user?.admin === 1;
  const userName = session?.user?.name || 'Usuario';

  const currentDate = new Date().toLocaleDateString('es-MX', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      {/* Header de bienvenida */}
      <div className="mb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="relative">
            <div className="bg-gradient-to-r from-[#6e1e2a] to-[#8b2635] px-6 py-8 text-white">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                <div className="text-center lg:text-left">
                  <h1 className="text-2xl lg:text-3xl font-bold mb-2">
                    ¡Bienvenido, {userName}!
                  </h1>
                  <p className="text-white/90 text-lg">
                    Sistema Integral de Recursos Humanos
                  </p>
                  <p className="text-white/70 text-sm mt-1 capitalize">
                    {currentDate}
                  </p>
                </div>
                <div className="hidden lg:block">
                  <Image
                    src="/assets/logo.png"
                    alt="Logo INJUVE"
                    width={200}
                    height={60}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accesos rápidos */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Accesos Rápidos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Mis Recibos */}
          <Link href="/sirh/recibos" className="group">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-200 transition-all duration-200">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors">
                  <LuReceipt className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Mis Recibos</h3>
                  <p className="text-sm text-gray-600">Consultar recibos de nómina</p>
                </div>
              </div>
            </div>
          </Link>

          {/* Empleados (Admin) */}
          {isAdmin && (
            <Link href="/sirh/admin/empleados" className="group">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md hover:border-green-200 transition-all duration-200">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors">
                    <LuUsers className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Empleados</h3>
                    <p className="text-sm text-gray-600">Gestionar empleados</p>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Periodos (Admin) */}
          {isAdmin && (
            <Link href="/sirh/admin/periodos" className="group">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md hover:border-purple-200 transition-all duration-200">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors">
                    <LuCalendarDays className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Periodos</h3>
                    <p className="text-sm text-gray-600">Administrar periodos</p>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* BSS (Admin) */}
          {isAdmin && (
            <Link href="/sirh/admin/bss" className="group">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md hover:border-orange-200 transition-all duration-200">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-orange-100 rounded-xl group-hover:bg-orange-200 transition-colors">
                    <LuBellRing className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">BSS</h3>
                    <p className="text-sm text-gray-600">Gestión de BSS</p>
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>

      {/* Información del sistema */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Novedades */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <LuFileText className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Novedades del Sistema</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <LuCheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-green-800">Sistema actualizado</p>
                <p className="text-sm text-green-600">Nueva interfaz responsiva implementada</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <LuTrendingUp className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-blue-800">Mejoras de rendimiento</p>
                <p className="text-sm text-blue-600">Carga más rápida de recibos y datos</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
              <LuClock className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-purple-800">Próximamente</p>
                <p className="text-sm text-purple-600">Notificaciones automáticas por email</p>
              </div>
            </div>
          </div>
        </div>

        {/* Información útil */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <LuCheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Información Útil</h3>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">¿Cómo consultar mis recibos?</h4>
              <p className="text-sm text-gray-600">
                Ve a la sección "Recibos" → "Mis Recibos" para consultar y descargar tus recibos de nómina.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">Formatos disponibles</h4>
              <p className="text-sm text-gray-600">
                Puedes descargar tus recibos en formato PDF o recibirlos por correo electrónico.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">Soporte técnico</h4>
              <p className="text-sm text-gray-600">
                Si tienes problemas, contacta al área de sistemas de INJUVE.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
