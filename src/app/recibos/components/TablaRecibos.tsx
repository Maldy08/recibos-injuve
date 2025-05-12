'use client';

import { useEffect, useState } from "react";
import { FaRegFilePdf } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im"; // spinner

interface Recibo {
    empleado: number;
    periodo: number;
    fechaPago: string;
    percepciones: string;
    deducciones: string;
    neto: string;
}

interface Props {
    empleado: number;
    nombre: string;
    rfc: string;
    curp: string;
    tipo: number;
}

export const TablaRecibos = ({ empleado, nombre, rfc, curp, tipo }: Props) => {
    const [recibos, setRecibos] = useState<Recibo[]>([]);
    const [anioSeleccionado, setAnioSeleccionado] = useState<string>("2025");
    const [loading, setLoading] = useState<boolean>(true);

    const formatoMoneda = (valor: string) =>
        Number(valor).toLocaleString("es-MX", {
            style: "currency",
            currency: "MXN",
        });

    const abrirPDF = async (empleado: number, periodo: number) => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}pdf/${empleado}/${periodo}`);
            if (!response.ok) throw new Error("No se pudo generar el PDF");

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            window.open(url, "_blank");
            setLoading(false);
        } catch (err) {
            console.error("Error al abrir el PDF:", err);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetch(`${process.env.NEXT_PUBLIC_API_URL}nomina/recibos/${empleado}`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const filtrados = data
                        .filter((r: Recibo) => r.fechaPago.includes(anioSeleccionado))
                        .sort((a, b) => b.periodo - a.periodo);
                    setRecibos(filtrados);
                }
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [anioSeleccionado, empleado]);

    const cambiarAnio = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setAnioSeleccionado(e.target.value);
    };

    return (
        <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mt-6 mb-4">
                <div>
                    <h2 className="text-lg font-semibold text-[#6e1e2a] flex items-center gap-2">
                        {
                            tipo === 1 ? "Recibos de Nómina" : "Recibos de Honorarios"
                        }
                    </h2>
                    <p className="text-sm text-gray-600"><span className=" font-bold">EMPLEADO:</span> {nombre}</p>
                    <p className="text-sm text-gray-600"><span className="font-bold">NUMERO:</span> {empleado}</p>
                    <p className="text-sm text-gray-600"><span className="font-bold">RFC:</span> {rfc}</p>
                    <p className="text-sm text-gray-600"><span className="font-bold">CURP:</span> {curp}</p>
                </div>
                <div>
                    <label htmlFor="anio" className="mr-2 text-sm text-gray-600">Año:</label>
                    <select
                        id="anio"
                        className="border rounded px-2 py-1 text-sm"
                        value={anioSeleccionado}
                        onChange={cambiarAnio}
                    >
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                    </select>
                </div>
            </div>

            <div className={`relative shadow-lg rounded-xl border border-gray-200 overflow-hidden ${loading ? "opacity-50" : ""}`}>
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-60 z-10">
                        <ImSpinner2 className="animate-spin text-3xl text-[#6e1e2a]" />
                    </div>
                )}

                <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
                    <thead className="bg-[#383838] text-white uppercase text-xs">
                        <tr>
                            <th className="px-4 py-3">Periodo</th>
                            <th className="px-4 py-3">Fecha de Pago</th>
                            <th className="px-4 py-3 text-right">Percepciones</th>
                            <th className="px-4 py-3 text-right">Deducciones</th>
                            <th className="px-4 py-3 text-right">Neto</th>
                            <th className="px-4 py-3 text-center">Ver</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recibos.length === 0 && !loading ? (
                            <tr>
                                <td colSpan={6} className="text-center py-4 text-gray-500">
                                    No hay recibos disponibles.
                                </td>
                            </tr>
                        ) : (
                            recibos.map((r) => (
                                <tr key={r.periodo} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-2 font-medium text-gray-700">{r.periodo}</td>
                                    <td className="px-4 py-2 text-gray-600">{r.fechaPago}</td>
                                    <td className="px-4 py-2 text-right text-gray-700">{formatoMoneda(r.percepciones)}</td>
                                    <td className="px-4 py-2 text-right text-gray-700">{formatoMoneda(r.deducciones)}</td>
                                    <td className="px-4 py-2 text-right font-semibold">{formatoMoneda(r.neto)}</td>
                                    <td className="px-4 py-2 text-center">
                                        <button
                                            onClick={() => abrirPDF(r.empleado, r.periodo)}
                                            className="text-blue-600 hover:text-blue-800"
                                            aria-label={`Ver PDF del periodo ${r.periodo}`}
                                        >
                                            <FaRegFilePdf className="w-5 h-5" />
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