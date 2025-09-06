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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black/70 to-black/60 backdrop-blur-sm p-2 sm:p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl max-h-[95vh] flex flex-col relative">
            {/* Header del modal */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
              <div className="flex-1">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#6e1e2a] truncate">
                  Periodos de {empleadoSeleccionado.NOMBRE} {empleadoSeleccionado.APPAT}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  RFC: {empleadoSeleccionado.RFC} | Email: {empleadoSeleccionado.EMAIL}
                </p>
              </div>
              <button
                onClick={() => { setEmpleadoSeleccionado(null); setPeriodos([]); }}
                className="ml-4 bg-gray-100 hover:bg-gray-300 text-gray-800 rounded-full p-2 transition-colors flex-shrink-0"
                aria-label="Cerrar modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Contenido del modal */}
            <div className="flex-1 overflow-y-auto min-h-0">
              {loadingPeriodos ? (
                <div className="flex justify-center items-center h-full min-h-[200px] p-4 sm:p-6">
                  <div className="text-center">
                    <ImSpinner2 className="animate-spin text-4xl sm:text-5xl text-[#6e1e2a] mx-auto mb-4" />
                    <p className="text-gray-600">Cargando periodos...</p>
                  </div>
                </div>
              ) : (
                <>
                  {periodos.length > 0 ? (
                    <div className="p-4 sm:p-6">
                      {/* Vista para pantallas grandes */}
                      <div className="hidden lg:block">
                        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                          <table className="min-w-full divide-y divide-gray-300 text-sm">
                            <thead className="bg-[#6e1e2a] text-white sticky top-0 z-10">
                              <tr>
                                <th className="px-4 py-3 text-left font-medium uppercase tracking-wider">Periodo</th>
                                <th className="px-4 py-3 text-left font-medium uppercase tracking-wider">Fecha Pago</th>
                                <th className="px-4 py-3 text-right font-medium uppercase tracking-wider">Percepciones</th>
                                <th className="px-4 py-3 text-right font-medium uppercase tracking-wider">Prestaciones</th>
                                <th className="px-4 py-3 text-right font-medium uppercase tracking-wider">Deducciones</th>
                                <th className="px-4 py-3 text-right font-medium uppercase tracking-wider">Neto</th>
                                <th className="px-4 py-3 text-center font-medium uppercase tracking-wider">Acciones</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {periodos.map((p) => (
                                <tr key={p.periodo} className="hover:bg-gray-50 transition-colors">
                                  <td className="px-4 py-3 font-medium text-gray-900">{p.periodo}</td>
                                  <td className="px-4 py-3 text-gray-700">{p.fechaPago}</td>
                                  <td className="px-4 py-3 text-right font-medium text-green-600">
                                    ${parseFloat(p.percepciones).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                  </td>
                                  <td className="px-4 py-3 text-right font-medium text-blue-600">
                                    ${parseFloat(p.prestaciones).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                  </td>
                                  <td className="px-4 py-3 text-right font-medium text-red-600">
                                    ${parseFloat(p.deducciones).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                  </td>
                                  <td className="px-4 py-3 text-right font-bold text-gray-900">
                                    ${parseFloat(p.neto).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                  </td>
                                  <td className="px-4 py-3">
                                    <div className="flex items-center justify-center gap-2">
                                      <button
                                        onClick={() => { sendEmailHandler(p.empleado, p.periodo, empleadoSeleccionado.EMAIL) }}
                                        className="bg-[#6e1e2a] hover:bg-[#5b1823] text-white p-2 rounded-full transition-colors"
                                        title="Enviar por correo"
                                      >
                                        <MdOutlineEmail className="w-4 h-4" />
                                      </button>
                                      <button
                                        onClick={() => { openPdfHandler(p.empleado, p.periodo) }}
                                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors"
                                        title="Descargar PDF"
                                      >
                                        <FaRegFilePdf className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Vista para pantallas medianas y pequeñas (cards) */}
                      <div className="lg:hidden space-y-4">
                        {periodos.map((p) => (
                          <div key={p.periodo} className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <span className="bg-[#6e1e2a] text-white px-3 py-1 rounded-full text-sm font-bold">
                                  Periodo {p.periodo}
                                </span>
                                <span className="text-sm text-gray-600">{p.fechaPago}</span>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => { sendEmailHandler(p.empleado, p.periodo, empleadoSeleccionado.EMAIL) }}
                                  className="bg-[#6e1e2a] hover:bg-[#5b1823] text-white p-2 rounded-full transition-colors"
                                  title="Enviar por correo"
                                >
                                  <MdOutlineEmail className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => { openPdfHandler(p.empleado, p.periodo) }}
                                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors"
                                  title="Descargar PDF"
                                >
                                  <FaRegFilePdf className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div className="bg-green-50 p-3 rounded-lg">
                                <p className="text-green-800 font-medium mb-1">Percepciones</p>
                                <p className="text-green-600 font-bold">
                                  ${parseFloat(p.percepciones).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                </p>
                              </div>
                              <div className="bg-blue-50 p-3 rounded-lg">
                                <p className="text-blue-800 font-medium mb-1">Prestaciones</p>
                                <p className="text-blue-600 font-bold">
                                  ${parseFloat(p.prestaciones).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                </p>
                              </div>
                              <div className="bg-red-50 p-3 rounded-lg">
                                <p className="text-red-800 font-medium mb-1">Deducciones</p>
                                <p className="text-red-600 font-bold">
                                  ${parseFloat(p.deducciones).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                </p>
                              </div>
                              <div className="bg-gray-50 p-3 rounded-lg border-2 border-gray-300">
                                <p className="text-gray-800 font-medium mb-1">Neto</p>
                                <p className="text-gray-900 font-bold text-lg">
                                  ${parseFloat(p.neto).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full min-h-[200px] p-4 sm:p-6">
                      <div className="text-center">
                        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-gray-500 text-lg font-medium">No se encontraron periodos</p>
                        <p className="text-gray-400 text-sm mt-1">Este empleado no tiene periodos registrados</p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};