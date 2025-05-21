// Puedes poner este componente donde lo necesites, por ejemplo en src/app/sirh/recibos/components/TablaResumen.tsx
'use client';
import { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { LuBellRing } from "react-icons/lu";

interface ResumenRecibo {
    PERIODO: number;
    FECHAPAGO: string;
    PERCEPCIONES: number;
    DEDUCCIONES: number;
    NETO: number;
}

export const TablaResumen = () => {
    const [resumen, setResumen] = useState<ResumenRecibo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const formatoMoneda = (valor: number) =>
        valor.toLocaleString("es-MX", {
            style: "currency",
            currency: "MXN",
        });

const generarTimbradoHandler = async (periodo: number) => {
    setLoading(true);
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}timbrado//${periodo}/1`,
            {
                method: "GET",
                headers: {
                    // Si necesitas autenticación, agrega aquí el header Authorization
                }
            }
        );
        if (!response.ok) throw new Error("Error al descargar el archivo");

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        // Extrae el nombre del archivo del header si lo necesitas
        const disposition = response.headers.get('Content-Disposition');
        let fileName = `TIMBRADO_PERIODO_${periodo}.xlsx`;
        if (disposition && disposition.includes('filename=')) {
            fileName = disposition
                .split('filename=')[1]
                .replace(/["']/g, "")
                .trim();
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

    useEffect(() => {
        setLoading(true);
        fetch(`${process.env.NEXT_PUBLIC_API_URL}nomina/resumen/1`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setResumen(data);
                } else if (data) {
                    setResumen([data]);
                }
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="max-w-3xl mx-auto px-4">

            <div className={`relative shadow-lg rounded-xl border border-gray-200 overflow-hidden ${loading ? "opacity-50" : ""}`}>
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-60 z-10">
                        <ImSpinner2 className="animate-spin text-3xl text-[#6e1e2a]" />
                    </div>
                )}
                <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
                    <thead className="bg-[#383838] text-white uppercase text-xs">
                        <tr>
                            <th className="px-4 py-3">PERIODO</th>
                            <th className="px-4 py-3">FECHA DE PAGO</th>
                            <th className="px-4 py-3 text-right">PERCEPCIONES</th>
                            <th className="px-4 py-3 text-right">DEDUCCIONES</th>
                            <th className="px-4 py-3 text-right">NETO</th>
                            <th className="px-4 py-3 text-right">ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resumen.length === 0 && !loading ? (
                            <tr>
                                <td colSpan={5} className="text-center py-4 text-gray-500">
                                    No hay datos disponibles.
                                </td>
                            </tr>
                        ) : (
                            resumen.map((r, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-2 font-medium text-gray-700">{r.PERIODO}</td>
                                    <td className="px-4 py-2 text-gray-600">{r.FECHAPAGO}</td>
                                    <td className="px-4 py-2 text-right text-gray-700">{formatoMoneda(r.PERCEPCIONES)}</td>
                                    <td className="px-4 py-2 text-right text-gray-700">{formatoMoneda(r.DEDUCCIONES)}</td>
                                    <td className="px-4 py-2 text-right font-semibold">{formatoMoneda(r.NETO)}</td>
                                    <td className="px-4 py-2 text-center">
                                        <button
                                            onClick={() => { generarTimbradoHandler(r.PERIODO) }}
                                            className="text-blue-600 hover:text-blue-800"
                                            title="Timbrar periodo"
                                        >
                                            <LuBellRing className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};