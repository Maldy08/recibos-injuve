"use client";

import { Puesto } from "@/app/domain/entities/puesto";
import { LuFileSignature, LuTrash2 } from "react-icons/lu";

interface PuestosTableProps {
  puestos: Puesto[];
  onEdit: (puesto: Puesto) => void;
  onDelete: (id: number) => void;
}

export default function PuestosTable({
  puestos,
  onEdit,
  onDelete,
}: PuestosTableProps) {
  if (!puestos.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-400">
        <LuFileSignature size={48} className="text-gray-200 mb-4" />
        <p>No hay puestos registrados.</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white">
      <table className="w-full text-left text-sm text-gray-500">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 font-medium">
          <tr>
            <th scope="col" className="px-6 py-4 border-b border-gray-200 w-32">
              Código
            </th>
            <th scope="col" className="px-6 py-4 border-b border-gray-200">
              Descripción
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
          {puestos.map((puesto) => (
            <tr
              key={puesto.PUESTO}
              className="bg-white hover:bg-gray-50 transition-colors"
            >
              <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                {puesto.PUESTO}
              </td>
              <td className="px-6 py-4 text-gray-700">{puesto.DESCRIPCION}</td>
              <td className="whitespace-nowrap px-6 py-4 text-center">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(puesto)}
                    className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                    title="Editar"
                  >
                    <LuFileSignature size={18} />
                  </button>
                  <button
                    onClick={() => {
                      if (
                        confirm(
                          `¿Estás seguro de eliminar el puesto ${puesto.DESCRIPCION}?`
                        )
                      ) {
                        onDelete(puesto.PUESTO);
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
