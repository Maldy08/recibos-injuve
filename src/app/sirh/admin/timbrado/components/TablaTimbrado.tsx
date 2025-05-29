'use client';
import { useState } from "react";
import { Table, Column } from "@/app/sirh/shared/Table";
import { RiFileExcel2Fill } from "react-icons/ri";

interface ResumenRecibo {
  PERIODO: number;
  FECHAPAGO: string;
  PERCEPCIONES: number;
  DEDUCCIONES: number;
  NETO: number;
}

interface Props {
  resumen: ResumenRecibo[];

}

const columns: Column<ResumenRecibo>[] = [
  { key: "PERIODO", label: "PERIODO" },
  { key: "FECHAPAGO", label: "FECHA DE PAGO" },
  { key: "PERCEPCIONES", label: "PERCEPCIONES", align: "right", render: (v: number) => v.toLocaleString("es-MX", { style: "currency", currency: "MXN" }) },
  { key: "DEDUCCIONES", label: "DEDUCCIONES", align: "right", render: (v: number) => v.toLocaleString("es-MX", { style: "currency", currency: "MXN" }) },
  { key: "NETO", label: "NETO", align: "right", render: (v: number) => v.toLocaleString("es-MX", { style: "currency", currency: "MXN" }) },
];

export default function TablaTimbrado({ resumen }: Props) {
  const [loading, setLoading] = useState(false);

  const generarTimbradoHandler = async (periodo: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}timbrado//${periodo}/1`,
        { method: "GET" }
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

  return (
    <Table
      data={resumen}
      columns={columns}
      loading={loading}
      acciones={(row) => (
        <button
          onClick={() => generarTimbradoHandler(row.PERIODO)}
          className="bg-[#6e1e2a] hover:bg-[#5b1823] text-white p-2 rounded-full transition"
          title="Descargar XLSX del periodo"
        >
          <RiFileExcel2Fill className="text-base" />
        </button>
      )}
    />
  );
}