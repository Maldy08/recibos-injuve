"use client";

import { CatalogConfig, CatalogRecord } from "../types";
import { LuFileSignature, LuTrash2 } from "react-icons/lu";

interface CatalogTableProps {
  config: CatalogConfig;
  rows: CatalogRecord[];
  actionLoadingId: number | null;
  onEdit: (row: CatalogRecord) => void;
  onDelete: (id: number) => void;
}

const formatNumber = (value: unknown) => {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return "-";
  }

  if (Number.isInteger(numericValue)) {
    return numericValue.toLocaleString("es-MX");
  }

  return numericValue.toLocaleString("es-MX", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export default function CatalogTable({
  config,
  rows,
  actionLoadingId,
  onEdit,
  onDelete,
}: CatalogTableProps) {
  if (!rows.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-400">
        <LuFileSignature size={48} className="text-gray-200 mb-4" />
        <p>No hay registros para {config.title.toLowerCase()}.</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white">
      <table className="w-full text-left text-sm text-gray-500">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 font-medium">
          <tr>
            {config.fields.map((field) => (
              <th key={field.name} scope="col" className="px-4 py-3 border-b border-gray-200">
                {field.label}
              </th>
            ))}
            <th scope="col" className="px-4 py-3 border-b border-gray-200 w-28 text-center">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {rows.map((row, index) => {
            const rowId = Number(row[config.primaryKey]);
            const safeRowId = Number.isFinite(rowId) ? rowId : -1;
            const rowKey = Number.isFinite(rowId) ? String(rowId) : `row-${index}`;

            return (
              <tr key={rowKey} className="bg-white hover:bg-gray-50 transition-colors">
                {config.fields.map((field) => (
                  <td
                    key={`${rowKey}-${field.name}`}
                    className="whitespace-nowrap px-4 py-3 text-gray-700 font-mono"
                  >
                    {formatNumber(row[field.name])}
                  </td>
                ))}
                <td className="whitespace-nowrap px-4 py-3 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(row)}
                      className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                      title="Editar"
                    >
                      <LuFileSignature size={18} />
                    </button>
                    <button
                      onClick={() => {
                        if (!Number.isFinite(rowId)) {
                          return;
                        }

                        if (
                          confirm(
                            `Deseas eliminar el registro ${config.primaryKey} ${safeRowId}?`
                          )
                        ) {
                          onDelete(safeRowId);
                        }
                      }}
                      disabled={actionLoadingId === safeRowId || !Number.isFinite(rowId)}
                      className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
                      title="Eliminar"
                    >
                      {actionLoadingId === safeRowId ? (
                        <span className="w-4 h-4 border-2 border-red-200 border-t-red-600 rounded-full animate-spin inline-block" />
                      ) : (
                        <LuTrash2 size={18} />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
