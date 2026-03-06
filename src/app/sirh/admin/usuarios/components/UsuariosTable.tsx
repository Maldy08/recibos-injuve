"use client";

import { Usuario } from "@/app/infrastructure/repositories/usuarios.repository";
import { LuFileSignature, LuTrash2 } from "react-icons/lu";

interface UsuariosTableProps {
  usuarios: Usuario[];
  onEdit: (usuario: Usuario) => void;
  onDelete: (id: number) => void;
}

export default function UsuariosTable({
  usuarios,
  onEdit,
  onDelete,
}: UsuariosTableProps) {
  const getTipoLabel = (tipo: number) => {
    return tipo === 1 ? "Base" : tipo === 2 ? "Honorarios" : "Desconocido";
  };

  const getTipoBadgeClass = (tipo: number) => {
    return tipo === 1
      ? "bg-blue-100 text-blue-800"
      : tipo === 2
      ? "bg-green-100 text-green-800"
      : "bg-gray-100 text-gray-800";
  };

  if (!usuarios.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-400">
        <LuFileSignature size={48} className="text-gray-200 mb-4" />
        <p>No hay usuarios registrados.</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white">
      <table className="w-full text-left text-sm text-gray-500">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 font-medium">
          <tr>
            <th scope="col" className="px-6 py-4 border-b border-gray-200 w-32">
              Empleado
            </th>
            <th scope="col" className="px-6 py-4 border-b border-gray-200">
              Nombre
            </th>
            <th scope="col" className="px-6 py-4 border-b border-gray-200">
              Correo
            </th>
            <th scope="col" className="px-6 py-4 border-b border-gray-200 w-32">
              Tipo
            </th>
            <th
              scope="col"
              className="px-6 py-4 border-b border-gray-200 w-24 text-center"
            >
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {usuarios.map((usuario) => (
            <tr
              key={usuario.EMPLEADO}
              className="bg-white hover:bg-gray-50 transition-colors"
            >
              <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                {usuario.EMPLEADO}
              </td>
              <td className="px-6 py-4 text-gray-700">{usuario.NOMBRE}</td>
              <td className="px-6 py-4 text-gray-700">{usuario.CORREO}</td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTipoBadgeClass(
                    usuario.TIPO
                  )}`}
                >
                  {getTipoLabel(usuario.TIPO)}
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-center">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(usuario)}
                    className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                    title="Editar"
                  >
                    <LuFileSignature size={18} />
                  </button>
                  <button
                    onClick={() => {
                      if (
                        confirm(
                          `¿Estás seguro de eliminar el usuario ${usuario.NOMBRE} (${usuario.EMPLEADO})?`
                        )
                      ) {
                        onDelete(usuario.EMPLEADO);
                      }
                    }}
                    className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                    title="Eliminar"
                  >
                    <LuTrash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
