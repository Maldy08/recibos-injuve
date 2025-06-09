'use client';

import { useState, useEffect } from "react";
import { Table, Column } from "@/app/sirh/shared/Table";
import { sendEmailHandler } from "@/app/sirh/shared/SendEmailHandler";

import { MdOutlineEmail } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { RiFileExcel2Fill } from "react-icons/ri";

interface ResumenRecibo {
  PERIODO: number;
  FECHAPAGO: string;
  PERCEPCIONES: number;
  DEDUCCIONES: number;
  NETO: number;
}

const columns: Column<ResumenRecibo>[] = [
  { key: "PERIODO", label: "PERIODO" },
  { key: "FECHAPAGO", label: "FECHA DE PAGO" },
  { key: "PERCEPCIONES", label: "PERCEPCIONES", align: "right", render: (v: number) => v.toLocaleString("es-MX", { style: "currency", currency: "MXN" }) },
  { key: "DEDUCCIONES", label: "DEDUCCIONES", align: "right", render: (v: number) => v.toLocaleString("es-MX", { style: "currency", currency: "MXN" }) },
  { key: "NETO", label: "NETO", align: "right", render: (v: number) => v.toLocaleString("es-MX", { style: "currency", currency: "MXN" }) },
];

export default function TablaTimbrado() {
  const [tipo, setTipo] = useState<number>(1); // 1 para nómina, 2 para honorarios
  const [resumen, setResumen] = useState<ResumenRecibo[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [progressTotal, setProgressTotal] = useState<number | null>(null);

  useEffect(() => {
    const fetchResumen = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}nomina/resumen/${tipo}`, {
          cache: "no-store",
        });
        const data = await res.json();
        setResumen(Array.isArray(data) ? data : [data]);
      } catch (e) {
        setResumen([]);
      } finally {
        setLoading(false);
      }
    };
    fetchResumen();
  }, [tipo]);

  const generarTimbradoHandler = async (periodo: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}timbrado//${periodo}/${tipo}`,
        { method: "GET", cache: "no-store" }
      );
      if (!response.ok) throw new Error("Error al descargar el archivo");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const disposition = response.headers.get('Content-Disposition');
      let fileName = `TIMBRADO_PERIODO_${periodo}.xlsx`;
      if (disposition && disposition.includes('filename=')) {
        fileName = disposition.split('filename=')[1].replace(/["']/g, "").trim();
      }
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("No se pudo descargar el archivo.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  const generarExcelBSSHandler = async (periodo: number) => {
    setLoading(true);
        try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}timbrado/percepciones/${periodo}`,
        { method: "GET", cache: "no-store" }
      );
      if (!response.ok) throw new Error("Error al descargar el archivo");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const disposition = response.headers.get('Content-Disposition');
      let fileName = `PERIODO_${periodo}_REVISION_BSS.xlsx`;
      if (disposition && disposition.includes('filename=')) {
        fileName = disposition.split('filename=')[1].replace(/["']/g, "").trim();
      }
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("No se pudo descargar el archivo.");
      console.error(error);
    } finally {
      setLoading(false);
    }
    setLoading(true);
  }

  return (
    <div className="relative">
      {/* Dropdown para seleccionar tipo */}
      <div className="flex justify-start mb-4">
        <label htmlFor="tipo" className="mr-2 text-sm text-gray-700 font-semibold">Tipo:</label>
        <select
          id="tipo"
          value={tipo}
          onChange={e => setTipo(Number(e.target.value))}
          className="border border-gray-300 rounded px-3 py-1 text-sm bg-gray-50 font-semibold"
        >
          <option value={1}>Nómina</option>
          <option value={2}>Honorarios</option>
        </select>
      </div>
      {loading && progressTotal !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center z-50">
          <div className="flex flex-col items-center gap-4 bg-white rounded-xl shadow-lg px-8 py-6">
            <div className="flex items-center gap-3">
              <svg className="animate-spin h-6 w-6 text-[#6e1e2a]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#6e1e2a" strokeWidth="4"></circle>
                <path className="opacity-75" fill="#6e1e2a" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              <span className="text-[#6e1e2a] font-semibold text-lg">
                Enviando recibos...
              </span>
            </div>
            <div className="w-64 h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-[#6e1e2a] to-[#a8324a] transition-all duration-300"
                style={{ width: `${(progress! / progressTotal!) * 100}%` }}
              ></div>
            </div>
            <span className="text-[#6e1e2a] font-medium">
              {progress} de {progressTotal} &nbsp;|&nbsp; {Math.round((progress! / progressTotal!) * 100)}%
            </span>
          </div>
        </div>
      )}
      <Table
        data={resumen}
        columns={columns}
        loading={loading}
        acciones={(row) => (
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => generarExcelBSSHandler(row.PERIODO)}
              className="bg-[#6e1e2a] hover:bg-[#5b1823] text-white p-2 rounded-full transition"
              title="Descargar Excel para revision BSS"
            >
              <RiFileExcel2Fill className="text-base" />
            </button>
            <button
              onClick={() => generarTimbradoHandler(row.PERIODO)}
              className="bg-[#6e1e2a] hover:bg-[#5b1823] text-white p-2 rounded-full transition"
              title="Descargar Timbrado del periodo"
            >
              <IoDocumentTextOutline className="text-base" />
            </button>
            <button
              onClick={() =>
                sendEmailHandler(row.PERIODO, tipo, setLoading, setProgress, setProgressTotal)
              }
              className="bg-[#6e1e2a] hover:bg-[#5b1823] text-white p-2 rounded-full transition"
              title="Enviar por correo"
            >
              <MdOutlineEmail className="text-base" />
            </button>
          </div>
        )}
      />
    </div>
  );
}