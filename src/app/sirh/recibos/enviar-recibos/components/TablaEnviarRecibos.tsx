'use client';
import { useState } from "react";
import { Table, Column } from "@/app/sirh/shared/Table";
import { RiFileExcel2Fill } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";

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

export default function TablaEnviarRecibos({ resumen }: Props) {
  const [loading, setLoading] = useState(false);

  const [progress, setProgress] = useState<number | null>(null);
  const [progressTotal, setProgressTotal] = useState<number | null>(null);

  const sendEmailHandler = (periodo: number, tipo: number) => {
    setLoading(true);
    setProgress(0);
    setProgressTotal(null);

    // Construye la URL con los parámetros (SSE solo acepta GET)
 const url = `${process.env.NEXT_PUBLIC_API_URL}send-email/enviar-recibos?periodo=${periodo}&tipo=${tipo}`;
    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.progreso !== undefined && data.total !== undefined) {
        setProgress(data.progreso);
        setProgressTotal(data.total);
      }
      if (data.mensaje) {
        alert(data.mensaje);
        setLoading(false);
        setProgress(null);
        setProgressTotal(null);
        eventSource.close();
      }
      if (data.error) {
        alert(data.error);
        setLoading(false);
        setProgress(null);
        setProgressTotal(null);
        eventSource.close();
      }
    };

    eventSource.onerror = () => {
      alert("Error en la conexión con el servidor.");
      setLoading(false);
      setProgress(null);
      setProgressTotal(null);
      eventSource.close();
    };
  };

  return (
    <div className="relative">
      {loading && progressTotal !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center z-50">
          <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-[#6e1e2a] transition-all"
              style={{ width: `${(progress! / progressTotal!) * 100}%` }}
            ></div>
          </div>
          <span className="text-white font-semibold">
            Enviando recibos... {progress} de {progressTotal}
          </span>
        </div>
      )}
      <Table
        data={resumen}
        columns={columns}
        loading={loading}
        acciones={(row) => (
          <button
            onClick={() => { sendEmailHandler(row.PERIODO, 1) }}
            className="bg-[#6e1e2a] hover:bg-[#5b1823] text-white p-2 rounded-full transition"
            title="Enviar por correo"
          >
            <MdOutlineEmail className="text-base" />
          </button>
        )}
      />
    </div>
  );
} 