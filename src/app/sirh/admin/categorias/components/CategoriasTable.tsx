"use client";

import { Categoria } from "@/app/domain/entities/categoria";
import { LuFileSignature, LuTrash2 } from "react-icons/lu";

interface CategoriasTableProps {
  categorias: Categoria[];
  onEdit: (categoria: Categoria) => void;
  onDelete: (id: number) => void;
}

export default function CategoriasTable({
  categorias,
  onEdit,
  onDelete,
}: CategoriasTableProps) {
  const formatCurrency = (amount: string) => {
    const value = parseFloat(amount);
    if (isNaN(value)) return amount;
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(value);
  };

  if (!categorias.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-400">
        <LuFileSignature size={48} className="text-gray-200 mb-4" />
        <p>No hay categorías registradas.</p>
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
            <th scope="col" className="px-6 py-4 border-b border-gray-200">
              Sueldo
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
          {categorias.map((categoria) => (
            <tr
              key={categoria.CATEGORIA}
              className="bg-white hover:bg-gray-50 transition-colors"
            >
              <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                {categoria.CATEGORIA}
              </td>
              <td className="px-6 py-4 text-gray-700">{categoria.DESCRIPCION}</td>
              <td className="px-6 py-4 text-gray-700 font-mono">
                {formatCurrency(categoria.SUELDO)}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-center">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(categoria)}
                    className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                    title="Editar"
                  >
                    <LuFileSignature size={18} />
                  </button>
                  <button
                    onClick={() => {
                      if (
                        confirm(
                          `¿Estás seguro de eliminar la categoría ${categoria.DESCRIPCION}?`
                        )
                      ) {
                        onDelete(categoria.CATEGORIA);
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
