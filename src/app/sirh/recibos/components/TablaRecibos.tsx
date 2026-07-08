'use client';

import usePdf from "@/app/hooks/usePdf";
import { useState } from "react";
import { FaRegFilePdf } from "react-icons/fa";
import { Table, Column } from "@/app/sirh/shared/Table";
import { FichaEmpleado } from "./FichaEmpleado";

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
    recibos: Recibo[];
    anioInicial: string;
}

const columns: Column<Recibo>[] = [
    { key: "periodo", label: "Periodo" },
    { key: "fechaPago", label: "Fecha de Pago" },
    { key: "percepciones", label: "Percepciones", align: "right", render: (v: string) => Number(v).toLocaleString("es-MX", { style: "currency", currency: "MXN" }) },
    { key: "deducciones", label: "Deducciones", align: "right", render: (v: string) => Number(v).toLocaleString("es-MX", { style: "currency", currency: "MXN" }) },
    { key: "neto", label: "Neto", align: "right", render: (v: string) => Number(v).toLocaleString("es-MX", { style: "currency", currency: "MXN" }) },
];

export const TablaRecibos = ({
    empleado,
    nombre,
    rfc,
    curp,
    tipo,
    recibos,
    anioInicial
}: Props) => {
    const [generandoPeriodo, setGenerandoPeriodo] = useState<number | null>(null);
    const { abrirPDF } = usePdf();

    const openPdfHandler = async (empleado: number, periodo: number) => {
        setGenerandoPeriodo(periodo);
        try {
            await abrirPDF(empleado, periodo, tipo);
        } catch (err) {
            console.error("Error generating PDF:", err);
        } finally {
            setGenerandoPeriodo(null);
        }
    };

    // Si quieres cambiar de año, deberías hacerlo en el page y volver a pasar los props

    return (
        <div className="mx-auto px-4">
            <div className="flex items-center justify-between mt-6 mb-4">
                <FichaEmpleado empleado={
                    { nombre, numero: empleado, rfc, curp }
                }/>
            </div>

            <Table
                data={recibos}
                columns={columns}
                loading={false}
                acciones={(row) => {
                    const estaCargando = generandoPeriodo === row.periodo;
                    const algunOtroCargando = generandoPeriodo !== null && generandoPeriodo !== row.periodo;
                    return (
                        <button
                            onClick={() => openPdfHandler(row.empleado, row.periodo)}
                            className="text-[#6e1e2a] hover:text-[#5b1823] disabled:opacity-40 disabled:cursor-not-allowed transition-colors p-1"
                            aria-label={`Ver PDF del periodo ${row.periodo}`}
                            disabled={generandoPeriodo !== null}
                            title={estaCargando ? "Generando PDF..." : "Descargar PDF"}
                        >
                            {estaCargando ? (
                                <svg className="animate-spin h-5 w-5 text-[#6e1e2a]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                </svg>
                            ) : (
                                <FaRegFilePdf className="w-5 h-5" />
                            )}
                        </button>
                    );
                }}
            />
        </div>
    );
};