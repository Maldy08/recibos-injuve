'use client';
import { Column, Table } from '@/app/sirh/shared/Table';
import React, { useEffect, useRef, useState } from 'react';
import { HiOutlineUpload, HiChevronDown } from "react-icons/hi";
import { MdEdit } from 'react-icons/md';

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
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Modal editar empleado
  const [modalOpen, setModalOpen] = useState(false);
  const [empleadoEdit, setEmpleadoEdit] = useState<TablaBSS | null>(null);

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

  // Función para descargar XML BBVA
  const generarXmlBss = async (banco: string) => {
    const periodo = prompt("Ingresa el periodo a exportar:");
    if (!periodo) return;


    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}bss/exportar-xml/${periodo}/${banco}`,
        { method: "GET" }
      );
      if (!response.ok) throw new Error("No se pudo generar el XML");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const disposition = response.headers.get('Content-Disposition');
      let fileName = banco === "012" ? `BSS_${periodo}_BBVA.xml` : `BSS_${periodo}_OTROS.xml`;

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
      alert("No se pudo generar el archivo XML");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  const generarTXTBss = async (banco: string) => {
    const periodo = prompt("Ingresa el periodo a exportar:");
    if (!periodo) return;

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}bss/exportar-txt/${periodo}/${banco}`,
        { method: "GET" }
      );
      if (!response.ok) throw new Error("No se pudo generar el TXT");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const disposition = response.headers.get('Content-Disposition');
      let fileName = banco === "012" ? `BSS_${periodo}_BBVA.txt` : `BSS_${periodo}_OTROS.txt`;

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
      alert("No se pudo generar el archivo TXT");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Dropdown handler
  const handleDropdownOption = (option: number) => {
    setDropdownOpen(false);
    switch (option) {
      case 1:
        generarXmlBss("012");
        break;
      case 2:
        generarTXTBss("012");
        break;
      case 3:
        generarXmlBss("011");
        break;
      case 4:
        generarTXTBss("011");
        break;
      default:
        console.warn("Opción no válida");
    }
  };

  // Modal handlers
  const handleEditarEmpleado = (empleado: TablaBSS) => {
    setEmpleadoEdit(empleado);
    setModalOpen(true);
  };

  const handleGuardarEmpleado = () => {
    // Aquí puedes hacer la petición para guardar los cambios
    alert("Empleado actualizado:\n" + JSON.stringify(empleadoEdit, null, 2));
    setModalOpen(false);
  };

  return (
    <div className="overflow-x-auto">
      {/* Modal editar empleado */}
      {modalOpen && empleadoEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
            <h2 className="text-lg font-bold mb-4 text-[#6e1e2a]">Editar empleado</h2>
            <div className="flex flex-col gap-3">
              <label className="text-xs font-semibold text-gray-700">
                Nombre:
                <input
                  type="text"
                  className="border rounded px-2 py-1 w-full mt-1"
                  value={empleadoEdit.nombre}
                  onChange={e => setEmpleadoEdit({ ...empleadoEdit, nombre: e.target.value })}
                />
              </label>
              <label className="text-xs font-semibold text-gray-700">
                CURP:
                <input
                  type="text"
                  className="border rounded px-2 py-1 w-full mt-1"
                  value={empleadoEdit.curp}
                  onChange={e => setEmpleadoEdit({ ...empleadoEdit, curp: e.target.value })}
                />
              </label>
              <label className="text-xs font-semibold text-gray-700">
                RFC:
                <input
                  type="text"
                  className="border rounded px-2 py-1 w-full mt-1"
                  value={empleadoEdit.rfc}
                  onChange={e => setEmpleadoEdit({ ...empleadoEdit, rfc: e.target.value })}
                />
              </label>
              <label className="text-xs font-semibold text-gray-700">
                CLABE:
                <input
                  type="text"
                  className="border rounded px-2 py-1 w-full mt-1"
                  value={empleadoEdit.clabe}
                  onChange={e => setEmpleadoEdit({ ...empleadoEdit, clabe: e.target.value })}
                />
              </label>
              <label className="text-xs font-semibold text-gray-700">
                Banco:
                <input
                  type="text"
                  className="border rounded px-2 py-1 w-full mt-1"
                  value={empleadoEdit.banco}
                  onChange={e => setEmpleadoEdit({ ...empleadoEdit, banco: e.target.value })}
                />
              </label>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 font-semibold"
                onClick={() => setModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 rounded bg-gradient-to-r from-[#6e1e2a] to-[#a8324a] text-white font-semibold shadow hover:from-[#5b1823] hover:to-[#a8324a]"
                onClick={handleGuardarEmpleado}
              >
                Guardar
              </button>
            </div>
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl"
              onClick={() => setModalOpen(false)}
              title="Cerrar"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Buscar..."
          className="border rounded px-3 py-2 text-sm w-64"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="flex gap-2 relative mr-4">
          {/* Botón Subir archivo */}
          <button
            className="text-xs flex items-center gap-2 bg-gradient-to-r from-[#6e1e2a] to-[#a8324a] hover:from-[#5b1823] hover:to-[#a8324a] text-white px-4 py-2 rounded-lg shadow-md transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-[#a8324a] focus:outline-none h-10"
            onClick={handleSubirArchivo}
            type="button"
            style={{ minWidth: 130 }}
          >
            <HiOutlineUpload className="w-5 h-5" />
            <span>Subir archivo</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleArchivoSeleccionado}
            accept=".csv,.xlsx,.xls"
          />
          {/* Botón Generar archivos con dropdown */}
          <div className="relative">
            <button
              type="button"
              className={`text-xs flex items-center gap-2 bg-gradient-to-r from-[#6e1e2a] to-[#a8324a] hover:from-[#5b1823] hover:to-[#a8324a] text-white px-4 py-2 rounded-lg shadow-md transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-[#a8324a] focus:outline-none h-10 ${dropdownOpen ? "ring-2 ring-[#a8324a]" : ""
                }`}
              style={{ minWidth: 130 }}
              onClick={() => setDropdownOpen((open) => !open)}
            >
              <span>Generar archivos</span>
              <HiChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-fade-in">
                <button
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-[#fdebed] text-[#6e1e2a] font-semibold transition"
                  onClick={() => handleDropdownOption(1)}
                >
                  Generar XML BBVA
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-[#fdebed] text-[#6e1e2a] font-semibold transition"
                  onClick={() => handleDropdownOption(2)}
                >
                  Generar TXT BBVA
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-[#fdebed] text-[#6e1e2a] font-semibold transition"
                  onClick={() => handleDropdownOption(3)}
                >
                  Generar XML OTROS
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-[#fdebed] text-[#6e1e2a] font-semibold transition"
                  onClick={() => handleDropdownOption(4)}
                >
                  Generar TXT OTROS
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Table
        columns={columns}
        data={filteredData}
        loading={loading}
        acciones={
          (row) => (
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => handleEditarEmpleado(row)}
                className="bg-[#6e1e2a] hover:bg-[#5b1823] text-white p-2 rounded-full transition"
                title="Editar empleado"
              >
                <MdEdit className="text-base" />
              </button>
            </div>
          )
        }
      />
    </div>
  );
};