'use client';

import { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { FaUser, FaRegFilePdf } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";


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

export const TablaEmpleados = () => {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [busqueda, setBusqueda] = useState<string>("");
  const [sortKey, setSortKey] = useState<keyof Empleado>("EMPLEADO");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState<Empleado | null>(null);
  const [periodos, setPeriodos] = useState<Periodo[]>([]);
  const [loadingPeriodos, setLoadingPeriodos] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}empleados`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setEmpleados(data);
      })
      .catch((err) => console.error("Error al obtener empleados:", err))
      .finally(() => setLoading(false));
  }, []);

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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}nomina/recibos/${emp.EMPLEADO}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setPeriodos(data);
      } else {
        setPeriodos([]);
      }
    } catch (error) {
      console.error("Error al cargar periodos:", error);
      setPeriodos([]);
    } finally {
      setLoadingPeriodos(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex justify-between items-center mt-6 mb-4">
        <div className="flex items-center gap-2">
          <FaUser className="text-[#6e1e2a]" />
          <h2 className="text-lg font-semibold text-[#6e1e2a]">Listado de Empleados</h2>
        </div>
        <input
          type="text"
          placeholder="Buscar empleado..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#6e1e2a]"
        />
      </div>

      <div className={`relative rounded-xl border border-gray-200 overflow-hidden ${loading ? "opacity-50" : ""}`}>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-60 z-10">
            <ImSpinner2 className="animate-spin text-3xl text-[#6e1e2a]" />
          </div>
        )}

        <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
          <thead className="bg-[#383838] text-white uppercase text-xs">
            <tr>
              <th onClick={() => ordenar("EMPLEADO")} className="px-4 py-3 cursor-pointer hover:underline">
                Empleado {sortKey === "EMPLEADO" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th onClick={() => ordenar("NOMBRE")} className="px-4 py-3 cursor-pointer hover:underline">
                Nombre {sortKey === "NOMBRE" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th onClick={() => ordenar("RFC")} className="px-4 py-3 cursor-pointer hover:underline">
                RFC {sortKey === "RFC" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th onClick={() => ordenar("CURP")} className="px-4 py-3 cursor-pointer hover:underline">
                CURP {sortKey === "CURP" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th onClick={() => ordenar("EMAIL")} className="px-4 py-3 cursor-pointer hover:underline">
                Correo {sortKey === "EMAIL" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th className="px-4 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empleadosFiltrados.length === 0 && !loading ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No hay empleados disponibles.
                </td>
              </tr>
            ) : (
              empleadosFiltrados.map((emp) => (
                <tr key={emp.EMPLEADO} className="hover:bg-gray-50 text-xs transition-colors">
                  <td className="px-4 py-2 font-medium text-gray-700">{emp.EMPLEADO}</td>
                  <td className="px-4 py-2 text-gray-600">{`${emp.NOMBRE} ${emp.APPAT} ${emp.APMAT}`}</td>
                  <td className="px-4 py-2 text-gray-600">{emp.RFC}</td>
                  <td className="px-4 py-2 text-gray-600">{emp.CURP}</td>
                  <td className="px-4 py-2 text-gray-600">{emp.EMAIL}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => abrirModalPeriodos(emp)}
                      className="text-white bg-primary-900 hover:bg-primary-800 rounded-lg flex items-center justify-center p-2 text-xs"
                    >
                      Periodos
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de Periodos */}
      {empleadoSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black/70 to-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-4xl relative animate-fade-in">

            {/* Botón de cerrar */}
            <button
              onClick={() => { setEmpleadoSeleccionado(null); setPeriodos([]); }}
              className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-300 text-gray-800 rounded-full p-2 transition"
            >
              ✕
            </button>

            {/* Título */}
            <h2 className="text-2xl font-bold text-center text-[#6e1e2a] mb-6">
              Periodos de {empleadoSeleccionado.NOMBRE} {empleadoSeleccionado.APPAT}
            </h2>

            {/* Contenido */}
            {loadingPeriodos ? (
              <div className="flex justify-center items-center py-20">
                <ImSpinner2 className="animate-spin text-5xl text-[#6e1e2a]" />
              </div>
            ) : (
              <>
                {periodos.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-300 text-sm text-center">
                      <thead className="bg-[#383838] text-white uppercase text-xs">
                        <tr>
                          <th className="px-4 py-3">Periodo</th>
                          <th className="px-4 py-3">Fecha Pago</th>
                          <th className="px-4 py-3">Percepciones</th>
                          <th className="px-4 py-3">Prestaciones</th>
                          <th className="px-4 py-3">Deducciones</th>
                          <th className="px-4 py-3">Neto</th>
                          <th className="px-4 py-3">Acciones</th> {/* NUEVA COLUMNA */}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {periodos.map((p) => (
                          <tr key={p.periodo} className="hover:bg-gray-50 transition">
                            <td className="px-4 py-3">{p.periodo}</td>
                            <td className="px-4 py-3">{p.fechaPago}</td>
                            <td className="px-4 py-3 font-medium text-green-700">
                              ${parseFloat(p.percepciones).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                            </td>
                            <td className="px-4 py-3 font-medium text-green-700">
                              ${parseFloat(p.prestaciones).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                            </td>
                            <td className="px-4 py-3 font-medium text-red-700">
                              ${parseFloat(p.deducciones).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                            </td>
                            <td className="px-4 py-3 font-semibold text-[#6e1e2a]">
                              ${parseFloat(p.neto).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                            </td>
                            <td className="px-4 py-3 flex items-center justify-center gap-3">
                              {/* Botón de Enviar Correo */}
                              <button
                                onClick={() => enviarCorreo(p)}
                                className="bg-[#6e1e2a] hover:bg-[#5b1823] text-white p-2 rounded-full transition"
                                title="Enviar por correo"
                              >
                                <MdOutlineEmail className="text-lg" />
                              </button>

                              {/* Botón de Descargar PDF */}
                              <button
                                onClick={() => descargarPDF(p)}
                                className="bg-[#6e1e2a] hover:bg-[#5b1823] text-white p-2 rounded-full transition"
                                title="Descargar PDF"
                              >
                                <FaRegFilePdf className="text-lg" />
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