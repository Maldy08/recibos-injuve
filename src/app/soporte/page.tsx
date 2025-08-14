// src/app/soporte/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { FaqSection } from "./components/FaqSection";
import { FormularioSoporte } from "./components/FormularioSoporte";



export const metadata = {
  title: 'INJUVE - Soporte Técnico',
  description: 'Centro de Ayuda y Soporte Técnico',
};

export default async function SoportePage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Acceso no autorizado</h1>
      </div>
    );
  }

  const usuario = {
    empleado: session.user?.empleado,
    nombre: session.user?.name + " " + session.user?.appat + " " + session.user?.apmat,
    rfc: session.user?.rfc,
    email: session.user?.email || '',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#6e1e2a] mb-2">Centro de Soporte Técnico</h1>
        <p className="text-gray-600">¿Necesitas ayuda? Estamos aquí para asistirte</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulario de Soporte */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-[#383838] mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-[#6e1e2a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Reportar Problema
          </h2>
          <FormularioSoporte usuario={usuario} />
        </div>

        {/* Información de Contacto */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-[#383838] mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-[#6e1e2a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Información de Contacto
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <svg className="w-5 h-5 text-[#6e1e2a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="font-medium text-gray-700">Email</p>
                  <p className="text-sm text-gray-600">soporte.injuve@bc.gob.mx</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <svg className="w-5 h-5 text-[#6e1e2a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p className="font-medium text-gray-700">Teléfono</p>
                  <p className="text-sm text-gray-600">(686) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <svg className="w-5 h-5 text-[#6e1e2a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-medium text-gray-700">Horario de Atención</p>
                  <p className="text-sm text-gray-600">Lunes a Viernes: 8:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Estado del Sistema */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-[#383838] mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Estado del Sistema
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Sistema de Nómina</span>
                <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-200 rounded-full">
                  Operativo
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Sistema de Recibos</span>
                <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-200 rounded-full">
                  Operativo
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Servidor de Email</span>
                <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-200 rounded-full">
                  Operativo
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-10">
        <FaqSection />
      </div>
    </div>
  );
}