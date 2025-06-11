'use client';

import { useState, useEffect, useRef } from "react";
import { ImSpinner2 } from "react-icons/im";
import { FaRegFilePdf } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { LuStickyNote } from "react-icons/lu";
import { HiOutlineUpload } from "react-icons/hi";
import usePdf from "@/app/hooks/usePdf";
import useSendMail from "@/app/hooks/useSendMail";
import { Table, Column } from "@/app/sirh/shared/Table";

interface Empleado {
  EMPLEADO: number;
  NOMBRE: string;
  APPAT: string;
  APMAT: string;
  RFC: string;
  CURP: string;
  EMAIL: string;
}

interface Periodo {
  periodo: number;
  empleado: number;
  fechaPago: string;
  percepciones: string;
  prestaciones: string;
  deducciones: string;
  neto: string;
}

const columns: Column<Empleado>[] = [
  { key: "EMPLEADO", label: "Empleado" },
  { key: "NOMBRE", label: "Nombre", render: (v, row) => `${row.NOMBRE} ${row.APPAT} ${row.APMAT}` },
  { key: "RFC", label: "RFC" },
  { key: "CURP", label: "CURP" },
  { key: "EMAIL", label: "Correo" },
];

export const TablaEmpleados = ({ tipo: tipoProp = 1 }: { tipo?: number }) => {
  const [busqueda, setBusqueda] = useState<string>("");
  const [sortKey, setSortKey] = useState<keyof Empleado>("EMPLEADO");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState<Empleado | null>(null);
  const [periodos, setPeriodos] = useState<Periodo[]>([]);
  const [loadingPeriodos, setLoadingPeriodos] = useState<boolean>(false);
  const [tipo, setTipo] = useState<number>(tipoProp);
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [loadingEmpleados, setLoadingEmpleados] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { abrirPDF } = usePdf();
  const { sendMail } = useSendMail();

  // Fetch empleados cada vez que cambia el tipo

  const fetchEmpleados = async (tipo: number) => {
    setLoadingEmpleados(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}empleados/${tipo}`, { cache: "no-store" });
      const data = await res.json();
      setEmpleados(Array.isArray(data) ? data : []);
    } catch {
      setEmpleados([]);
    } finally {
      setLoadingEmpleados(false);
    }
  };

  useEffect(() => {
    fetchEmpleados(tipo);
    setEmpleadoSeleccionado(null);
    setPeriodos([]);
  }, [tipo]);

  const ordenar = (campo: keyof Empleado) => {
    if (campo === sortKey) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(campo);
      setSortOrder("asc");
    }
  };

  const empleadosFiltrados = empleados
    .filter((emp) => {
      const texto = `${emp.NOMBRE} ${emp.APPAT} ${emp.APMAT} ${emp.RFC} ${emp.CURP} ${emp.EMAIL}`.toLowerCase();
      return texto.includes(busqueda.toLowerCase());
    })
    .sort((a, b) => {
      const valorA = a[sortKey];
      const valorB = b[sortKey];
      if (typeof valorA === "number" && typeof valorB === "number") {
        return sortOrder === "asc" ? valorA - valorB : valorB - valorA;
      } else {
        return sortOrder === "asc"
          ? String(valorA).localeCompare(String(valorB))
          : String(valorB).localeCompare(String(valorA));
      }
    });

  const abrirModalPeriodos = async (emp: Empleado) => {
    setEmpleadoSeleccionado(emp);
    setLoadingPeriodos(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}nomina/recibos/${emp.EMPLEADO}/${tipo}`);
      const data = await res.json();
      setPeriodos(Array.isArray(data) ? data : []);
    } catch (error) {
      setPeriodos([]);
    } finally {
      setLoadingPeriodos(false);
    }
  };

  const openPdfHandler = async (empleado: number, periodo: number) => {
    setLoadingPeriodos(true);
    await abrirPDF(empleado, periodo, tipo);
    setLoadingPeriodos(false);
  };

  const sendEmailHandler = async (empleado: number, periodo: number, correo: string) => {
    setLoadingPeriodos(true);
    try {
      await sendMail(empleado, periodo, correo, tipo);
      alert("Correo enviado exitosamente");
    } catch {
      alert("Error al enviar el correo");
    } finally {
      setLoadingPeriodos(false);
    }
  };

  // Subir empleados
  const handleSubirEmpleados = () => {
    fileInputRef.current?.click();
  };

  const handleArchivoSeleccionado = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("archivo", file);

    setLoadingEmpleados(true);
    try {
      // Selecciona el endpoint según el tipo
      const endpoint =
        tipo === 1
          ? `${process.env.NEXT_PUBLIC_API_URL}upload/mnom01`
          : `${process.env.NEXT_PUBLIC_API_URL}upload/mnom01h`;

      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Error al subir el archivo");
      alert("Archivo subido correctamente");
      fetchEmpleados(tipo); // Refrescar la lista de empleados
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}empleados/${tipo}`, { cache: "no-store" });
      const data = await res.json();
      setEmpleados(Array.isArray(data) ? data : []);
    } catch (error) {
      alert("No se pudo subir el archivo");
      console.error(error);
    } finally {
      setLoadingEmpleados(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex justify-between items-center mt-6 mb-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Buscar empleado..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#6e1e2a]"
          />
          <select
            value={tipo}
            onChange={e => setTipo(Number(e.target.value))}
            className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#6e1e2a] bg-white"
          >
            <option value={1}>Nómina</option>
            <option value={2}>Honorarios</option>
          </select>
        </div>
        <div>
          <button
            className="text-xs flex items-center gap-2 bg-gradient-to-r from-[#6e1e2a] to-[#a8324a] hover:from-[#5b1823] hover:to-[#a8324a] text-white px-4 py-2 rounded-lg shadow-md transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-[#a8324a] focus:outline-none"
            onClick={handleSubirEmpleados}
            type="button"
          >
            <HiOutlineUpload className="w-5 h-5" />
            <span>Subir empleados</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleArchivoSeleccionado}
            accept=".csv,.xlsx,.xls"
          />
        </div>
      </div>

      <Table
        data={empleadosFiltrados}
        columns={columns}
        loading={loadingEmpleados}
        acciones={(emp) => (
          <button
            onClick={() => abrirModalPeriodos(emp)}
            className="text-white bg-primary-900 hover:bg-primary-800 rounded-lg flex items-center justify-center p-2 text-xs"
          >
            <LuStickyNote />
            <span className="ml-2">Periodos</span>
          </button>
        )}
      />

      {/* Modal de Periodos */}
      {empleadoSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black/70 to-black/60 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-6 md:p-8 relative animate-fade-in overflow-hidden">
            <button
              onClick={() => { setEmpleadoSeleccionado(null); setPeriodos([]); }}
              className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-300 text-gray-800 rounded-full p-2 transition"
            >
              ✕
            </button>
            <h2 className="text-xl md:text-2xl font-bold text-center text-[#6e1e2a] mb-6">
              Periodos de {empleadoSeleccionado.NOMBRE} {empleadoSeleccionado.APPAT}
            </h2>
            {loadingPeriodos ? (
              <div className="flex justify-center items-center py-20">
                <ImSpinner2 className="animate-spin text-5xl text-[#6e1e2a]" />
              </div>
            ) : (
              <>
                {periodos.length > 0 ? (
                  <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 rounded-md">
                    <table className="min-w-[700px] divide-y divide-gray-300 text-sm md:text-base text-center">
                      <thead className="bg-[#383838] text-white uppercase text-xs">
                        <tr>
                          <th className="px-3 py-2">Periodo</th>
                          <th className="px-3 py-2">Fecha Pago</th>
                          <th className="px-3 py-2">Percepciones</th>
                          <th className="px-3 py-2">Prestaciones</th>
                          <th className="px-3 py-2">Deducciones</th>
                          <th className="px-3 py-2">Neto</th>
                          <th className="px-3 py-2">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {periodos.map((p) => (
                          <tr key={p.periodo} className="hover:bg-gray-50 transition">
                            <td className="px-3 py-2 text-md">{p.periodo}</td>
                            <td className="px-3 py-2 text-xs">{p.fechaPago}</td>
                            <td className="px-3 py-2 font-medium text-xs">
                              ${parseFloat(p.percepciones).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                            </td>
                            <td className="px-3 py-2 font-medium text-xs">
                              ${parseFloat(p.prestaciones).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                            </td>
                            <td className="px-3 py-2 font-medium text-xs">
                              ${parseFloat(p.deducciones).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                            </td>
                            <td className="px-3 py-2 font-semibold text-xs">
                              ${parseFloat(p.neto).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                            </td>
                            <td className="px-3 py-2 flex items-center justify-center gap-2">
                              <button
                                onClick={() => { sendEmailHandler(p.empleado, p.periodo, "camv29@gmail.com") }}
                                className="bg-[#6e1e2a] hover:bg-[#5b1823] text-white p-2 rounded-full transition"
                                title="Enviar por correo"
                              >
                                <MdOutlineEmail className="text-base" />
                              </button>
                              <button
                                onClick={() => { openPdfHandler(p.empleado, p.periodo) }}
                                className="bg-[#6e1e2a] hover:bg-[#5b1823] text-white p-2 rounded-full transition"
                                title="Descargar PDF"
                              >
                                <FaRegFilePdf className="text-base" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-center text-gray-500 italic py-10">No se encontraron periodos.</p>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};