'use client';

import { useState, useEffect } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import LoadingOverlay from "./LoadingOverlay";

export interface Column<T> {
  key: keyof T;
  label: string;
  align?: "left" | "right" | "center";
  render?: (value: any, row: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  acciones?: (row: T) => React.ReactNode;
  rowsPerPage?: number;
}

export const Table = <T,>({
  data,
  columns,
  loading = false,
  acciones,
  rowsPerPage = 10,
}: TableProps<T>) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(data.length / rowsPerPage));
  const paginatedData = data.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  useEffect(() => {
    setPage(1);
  }, [data]);

  return (
    <div className="relative rounded-2xl border border-gray-200 shadow-lg bg-white overflow-x-auto w-full">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-white bg-opacity-80">
          <LoadingOverlay text="Cargando..." />
        </div>
      )}

      <table className="min-w-full divide-y divide-gray-200 text-sm font-sans">
        <thead className="sticky top-0 z-10 bg-[#f9fafb] text-gray-700 text-sm border-b shadow-sm">
          <tr>
            {acciones && (
              <th className="px-5 py-3 text-center font-semibold tracking-wider">
                ACCIONES
              </th>
            )}
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={`px-5 py-3 font-semibold tracking-wider ${
                  col.align === "right"
                    ? "text-right"
                    : col.align === "center"
                    ? "text-center"
                    : "text-left"
                }`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.length === 0 && !loading ? (
            <tr>
              <td
                colSpan={columns.length + (acciones ? 1 : 0)}
                className="text-center py-8 text-gray-400 italic"
              >
                No hay datos disponibles.
              </td>
            </tr>
          ) : (
            paginatedData.map((row, idx) => (
              <tr
                key={idx}
                className="even:bg-white odd:bg-gray-50 hover:bg-[#fdebed] transition-colors border-b border-gray-100"
              >
                {acciones && (
                  <td className="px-5 py-3 text-center">
                    {acciones(row)}
                  </td>
                )}
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    className={`px-5 py-3 align-middle text-xs text-gray-800 ${
                      col.align === "right"
                        ? "text-right"
                        : col.align === "center"
                        ? "text-center"
                        : ""
                    }`}
                  >
                    {col.render
                      ? col.render(row[col.key], row)
                      : String(row[col.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Paginación y total de registros */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center gap-3 py-4 px-6 bg-[#f9f4f5] rounded-b-xl">
          {/* Total de registros a la izquierda */}
          <span className="text-xs text-gray-600 font-medium">
            Total de registros: <span className="font-bold">{data.length}</span>
          </span>
          {/* Botones de paginación a la derecha */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              disabled={page === 1}
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#6e1e2a] text-white hover:bg-[#5b1823] disabled:opacity-40 disabled:cursor-not-allowed shadow-md transition transform hover:scale-105"
              title="Anterior"
            >
              <FaChevronLeft />
            </button>
            <span className="text-sm font-medium select-none">
              Página <span className="font-bold">{page}</span> de{" "}
              <span className="font-bold">{totalPages}</span>
            </span>
            <button
              onClick={handleNext}
              disabled={page === totalPages}
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#6e1e2a] text-white hover:bg-[#5b1823] disabled:opacity-40 disabled:cursor-not-allowed shadow-md transition transform hover:scale-105"
              title="Siguiente"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};