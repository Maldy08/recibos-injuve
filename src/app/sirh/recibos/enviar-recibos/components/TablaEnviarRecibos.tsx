'use client';
import { useState } from "react";
import { Table, Column } from "@/app/sirh/shared/Table";
import { RiFileExcel2Fill } from "react-icons/ri";
import { MdOutlineEmail, MdCheckCircle, MdError, MdWarning } from "react-icons/md";
import { FiDownload, FiX } from "react-icons/fi";

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

interface ErrorEmpleado {
  empleado: number;
  correo: string;
  error: string;
  fecha: string;
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
  const [enviados, setEnviados] = useState<number>(0);
  const [fallidos, setFallidos] = useState<number>(0);
  const [bitacoraErrores, setBitacoraErrores] = useState<ErrorEmpleado[]>([]);
  const [mostrarBitacora, setMostrarBitacora] = useState(false);

  // Función para descargar la bitácora de errores como CSV
  const descargarBitacoraCSV = () => {
    if (bitacoraErrores.length === 0) return;

    const headers = ['Empleado', 'Correo', 'Error', 'Fecha'];
    const rows = bitacoraErrores.map(e => [
      e.empleado,
      e.correo,
      e.error.replace(/,/g, ';'), // Escapar comas
      new Date(e.fecha).toLocaleString('es-MX')
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `bitacora_errores_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const sendEmailHandler = (periodo: number, tipo: number) => {
    setLoading(true);
    setProgress(0);
    setProgressTotal(null);
    setEnviados(0);
    setFallidos(0);
    setBitacoraErrores([]);
    setMostrarBitacora(false);

    // Construye la URL con los parámetros (SSE solo acepta GET)
    const url = `${process.env.NEXT_PUBLIC_API_URL}send-email/enviar-recibos?periodo=${periodo}&tipo=${tipo}`;
    const eventSource = new EventSource(url);
    
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      // Actualizar progreso y contadores
      if (data.progreso !== undefined && data.total !== undefined) {
        setProgress(data.progreso);
        setProgressTotal(data.total);
        
        // Actualizar contadores de enviados y fallidos
        if (data.enviados !== undefined) setEnviados(data.enviados);
        if (data.fallidos !== undefined) setFallidos(data.fallidos);
      }

      // Capturar errores individuales en tiempo real (opcional)
      if (data.errorEmpleado) {
        console.log('Error en empleado:', data.errorEmpleado);
        // Puedes mostrar una notificación toast aquí si lo deseas
      }

      // CRÍTICO: Detectar finalización y cerrar conexión
      if (data.finalizado) {
        eventSource.close();
        setLoading(false);
        
        // Procesar mensaje final
        if (data.mensaje) {
          // Si hay errores, guardar la bitácora
          if (data.resumen && data.resumen.bitacoraErrores && data.resumen.bitacoraErrores.length > 0) {
            setBitacoraErrores(data.resumen.bitacoraErrores);
            setMostrarBitacora(true);
            
            // Mostrar mensaje con opción de ver errores
            const verErrores = confirm(
              `${data.mensaje}\n\n¿Desea ver el detalle de los errores?`
            );
            if (!verErrores) {
              setMostrarBitacora(false);
            }
          } else {
            // Proceso exitoso sin errores
            alert(data.mensaje);
            // Resetear estados
            setProgress(null);
            setProgressTotal(null);
            setEnviados(0);
            setFallidos(0);
          }
        }
        
        // Error crítico
        if (data.error) {
          alert(data.error);
          setProgress(null);
          setProgressTotal(null);
          setEnviados(0);
          setFallidos(0);
        }
      }
    };

    eventSource.onerror = () => {
      alert("Error en la conexión con el servidor.");
      setLoading(false);
      setProgress(null);
      setProgressTotal(null);
      setEnviados(0);
      setFallidos(0);
      eventSource.close();
    };
  };

  const cerrarBitacora = () => {
    setMostrarBitacora(false);
    setProgress(null);
    setProgressTotal(null);
    setEnviados(0);
    setFallidos(0);
    setBitacoraErrores([]);
  };

  return (
    <div className="relative">
      {/* Modal de progreso */}
      {loading && progressTotal !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center z-50">
          <div className="flex flex-col items-center gap-4 bg-white rounded-xl shadow-lg px-8 py-6 min-w-[400px]">
            <div className="flex items-center gap-3">
              <svg className="animate-spin h-6 w-6 text-[#6e1e2a]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#6e1e2a" strokeWidth="4"></circle>
                <path className="opacity-75" fill="#6e1e2a" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              <span className="text-[#6e1e2a] font-semibold text-lg">
                Enviando recibos...
              </span>
            </div>

            {/* Barra de progreso */}
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-[#6e1e2a] to-[#a8324a] transition-all duration-300"
                style={{ width: `${(progress! / progressTotal!) * 100}%` }}
              ></div>
            </div>

            {/* Contadores principales */}
            <div className="flex items-center gap-4 text-[#6e1e2a] font-medium">
              <span>{progress} / {progressTotal}</span>
              <span className="text-gray-400">|</span>
              <span>{Math.round((progress! / progressTotal!) * 100)}%</span>
            </div>

            {/* Contadores detallados */}
            <div className="flex gap-6 mt-2 pt-3 border-t border-gray-200 w-full justify-center">
              <div className="flex items-center gap-2">
                <MdCheckCircle className="text-green-600 text-xl" />
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">Enviados</span>
                  <span className="text-lg font-bold text-green-600">{enviados}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <MdError className="text-red-600 text-xl" />
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">Fallidos</span>
                  <span className="text-lg font-bold text-red-600">{fallidos}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de bitácora de errores */}
      {mostrarBitacora && bitacoraErrores.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <MdWarning className="text-yellow-600 text-3xl" />
                <div>
                  <h2 className="text-xl font-bold text-[#6e1e2a]">
                    Bitácora de Errores
                  </h2>
                  <p className="text-sm text-gray-600">
                    {bitacoraErrores.length} empleado(s) con errores en el envío
                  </p>
                </div>
              </div>
              <button
                onClick={cerrarBitacora}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full p-2 transition-colors"
                aria-label="Cerrar"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Contenido */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-3">
                {bitacoraErrores.map((error, idx) => (
                  <div
                    key={idx}
                    className="bg-red-50 border border-red-200 rounded-lg p-4 hover:bg-red-100 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <MdError className="text-red-600 text-xl flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-900">
                            Empleado #{error.empleado}
                          </span>
                          <span className="text-gray-400">•</span>
                          <span className="text-sm text-gray-600">
                            {error.correo}
                          </span>
                        </div>
                        <p className="text-sm text-red-700 mb-1">
                          <strong>Error:</strong> {error.error}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(error.fecha).toLocaleString('es-MX')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer con botones */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={descargarBitacoraCSV}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <FiDownload className="w-4 h-4" />
                Descargar CSV
              </button>
              <button
                onClick={cerrarBitacora}
                className="bg-[#6e1e2a] hover:bg-[#5b1823] text-white px-6 py-2 rounded-lg transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabla */}
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