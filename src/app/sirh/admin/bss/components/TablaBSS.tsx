'use client';
import { Column, Table } from '@/app/sirh/shared/Table';
import React, { useEffect, useRef, useState } from 'react';

interface TablaBSS {
  empleado: string;
  nombre: string;
  curp: string;
  rfc: string;
  isstecali: number;
  clabe: string;
  banco: string;
  importe_new: number;
  tipo: string;
  concepto: string;
}

const columns: Column<TablaBSS>[] = [
  { key: "empleado", label: "EMPLEADO" },
  { key: "nombre", label: "NOMBRE" },
  { key: "curp", label: "CURP" },
  { key: "rfc", label: "RFC" },
  { key: "isstecali", label: "ISSTECALI" },
  { key: "clabe", label: "CLABE" },
  { key: "banco", label: "BANCO" },
  {
    key: "importe_new",
    label: "IMPORTE",
    align: "right",
    render: (v: number) =>
      typeof v === "number"
        ? v.toLocaleString("es-MX", { style: "currency", currency: "MXN" })
        : ""
  },
  { key: "tipo", label: "TIPO" },
  { key: "concepto", label: "CONCEPTO" }
];

export const TablaBSS = () => {
  const [loading, setLoading] = useState(false);
  const [bssData, setBSSData] = useState<TablaBSS[]>([]);
  const [search, setSearch] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);


  const fetchBSSData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}bss/get-datos-bss`, {
        cache: "no-store",
      });
      const data = await response.json();
      setBSSData(Array.isArray(data) ? data : [data]);
    } catch (error) {
      console.error("Error fetching BSS data:", error);
      setBSSData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBSSData();
  }, []);

  // Filtrado simple por cualquier campo de texto
  const filteredData = bssData.filter((row) =>
    Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Manejo de subida de archivo
  const handleSubirArchivo = () => {
    fileInputRef.current?.click();
  };

  const handleArchivoSeleccionado = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}bss/upload`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Error al subir el archivo");
      alert("Archivo subido correctamente");
      await fetchBSSData(); 
    } catch (error) {
      alert("No se pudo subir el archivo");
      console.error(error);
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Buscar..."
          className="border rounded px-3 py-2 text-sm w-64"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button
          className="bg-[#6e1e2a] hover:bg-[#5b1823] text-white px-4 py-2 rounded transition"
          onClick={handleSubirArchivo}
          type="button"
        >
          Subir archivo
        </button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleArchivoSeleccionado}
          accept=".csv,.xlsx,.xls" // ajusta según lo que aceptes
        />
      </div>
      <Table
        columns={columns}
        data={filteredData}
        loading={loading}
      />
    </div>
  );
};