'use client';

import { useState, useEffect } from "react";
import { Table, Column } from "@/app/sirh/shared/Table";
import { LuRefreshCw } from "react-icons/lu";
import { HiOutlineDownload } from "react-icons/hi";

interface Respaldo {
  nombre: string;
  tamaño: number;
  fechaCreacion: string;
  fechaModificacion: string;
}

const formatSize = (bytes: number): string => {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / 1024).toFixed(1)} KB`;
};

const formatDate = (iso: string): string => {
  const d = new Date(iso);
  return d.toLocaleString("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const columns: Column<Respaldo>[] = [
  { key: "nombre", label: "NOMBRE DEL ARCHIVO" },
  {
    key: "tamaño",
    label: "TAMAÑO",
    render: (v: number) => formatSize(v),
  },
  {
    key: "fechaCreacion",
    label: "FECHA DE CREACIÓN",
    render: (v: string) => formatDate(v),
  },
];

export default function TablaRespaldos() {
  const [loading, setLoading] = useState(false);
  const [respaldos, setRespaldos] = useState<Respaldo[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchRespaldos = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}upload/backup-mdb`,
        { cache: "no-store" }
      );
      if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
      const data = await res.json();
      setRespaldos(Array.isArray(data.archivos) ? data.archivos : []);
    } catch (e) {
      console.error(e);
      setError("No se pudo obtener la lista de respaldos. Intenta de nuevo.");
      setRespaldos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRespaldos();
  }, []);

  const handleDescargar = (nombre: string) => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}upload/backup-mdb/${encodeURIComponent(nombre)}`;
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="flex justify-end items-center mb-4">
        <button
          type="button"
          className="text-xs flex items-center gap-2 bg-gradient-to-r from-[#6e1e2a] to-[#a8324a] hover:from-[#5b1823] hover:to-[#a8324a] text-white px-4 py-2 rounded-lg shadow-md transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-[#a8324a] focus:outline-none h-10"
          onClick={fetchRespaldos}
          disabled={loading}
        >
          <LuRefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          <span>Actualizar</span>
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
          {error}
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && respaldos.length === 0 ? (
        <div className="text-center py-10 text-gray-400 italic text-sm rounded-2xl border border-gray-200 shadow-lg bg-white">
          No hay respaldos disponibles.
        </div>
      ) : (
        <Table
          data={respaldos}
          columns={columns}
          loading={loading}
          acciones={(row) => (
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => handleDescargar(row.nombre)}
                className="bg-[#6e1e2a] hover:bg-[#5b1823] text-white p-2 rounded-full transition"
                title="Descargar respaldo"
              >
                <HiOutlineDownload className="text-base" />
              </button>
            </div>
          )}
        />
      )}
    </div>
  );
}
