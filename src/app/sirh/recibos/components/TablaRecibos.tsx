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
    const [generandoRecibo, setGenerandoRecibo] = useState<boolean>(false);
    const { abrirPDF } = usePdf();

    const openPdfHandler = async (empleado: number, periodo: number) => {
        setGenerandoRecibo(true);
        await abrirPDF(empleado, periodo, tipo);
        setGenerandoRecibo(false);
    };

    // Si quieres cambiar de año, deberías hacerlo en el page y volver a pasar los props

    return (
        <div className="mx-auto px-4">
            <div className="flex items-center justify-between mt-6 mb-4">
                <FichaEmpleado empleado={
                    { nombre, numero: empleado, rfc, curp }
                }/>
                {/* <div className="flex flex-col items-end">
                    <label htmlFor="anio" className="mb-1 text-sm text-gray-600">Año:</label>
                    <input
                        id="anio"
                        className="border border-gray-300 rounded px-3 py-1 text-sm bg-gray-50 font-semibold text-center w-24"
                        value={anioInicial}
                        readOnly
                    />
                </div> */}
            </div>

            <Table
                data={recibos}
                columns={columns}
                loading={generandoRecibo}
                acciones={(row) => (
                    <button
                        onClick={() => openPdfHandler(row.empleado, row.periodo)}
                        className="text-blue-600 hover:text-blue-800"
                        aria-label={`Ver PDF del periodo ${row.periodo}`}
                    >
                        <FaRegFilePdf className="w-5 h-5" />
                    </button>
                )}
            />
        </div>
    );
};