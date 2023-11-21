'use client'

import { Reporte } from "@/interfaces/Formato";
import { CrearHipervinculo, SelectFormatos, TableBitacoras } from "."
import { useWrapper } from "../hooks/useWrapper";


interface Props {
    reporte: Reporte[];
    idusuario: number;
}

export const Wrapper = ({ reporte, idusuario }: Props) => {

    const { formato, handleChangeFormato } = useWrapper();


    return (
        <>
            <div className=" lg:w-3/5 md:w-full sm:w-full bg-white p-10 rounded-lg">
                <SelectFormatos value={formato} reporte={reporte} handleChangeFormato={handleChangeFormato} />

                {/* Formulario */}
                <CrearHipervinculo formato={ formato } idusuario={idusuario} />
            </div>

            <div className="w-full rounded-xl">
                <TableBitacoras idusuario={idusuario} formato={formato} />
            </div>
        </>
    )
}
