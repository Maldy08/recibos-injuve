'use client'

import { ImSpinner2 } from "react-icons/im";
import React from "react";

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
}

export const Table = <T,>({
  data,
  columns,
  loading = false,
  acciones,
}: TableProps<T>) => {
  return (
    <div className={`relative shadow-lg rounded-xl border border-gray-200 overflow-hidden ${loading ? "opacity-50" : ""}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-60 z-10">
          <ImSpinner2 className="animate-spin text-3xl text-[#6e1e2a]" />
        </div>
      )}
      <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
        <thead className="bg-[#383838] text-white uppercase text-xs">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={`px-4 py-3 ${col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : ""}`}
              >
                {col.label}
              </th>
            ))}
            {acciones && <th className="px-4 py-3 text-center">ACCIONES</th>}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && !loading ? (
            <tr>
              <td colSpan={columns.length + (acciones ? 1 : 0)} className="text-center py-4 text-gray-500">
                No hay datos disponibles.
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    className={`px-4 py-2 ${col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : ""}`}
                  >
                   {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? "")}
                  </td>
                ))}
                {acciones && (
                  <td className="px-4 py-2 text-center">
                    {acciones(row)}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};