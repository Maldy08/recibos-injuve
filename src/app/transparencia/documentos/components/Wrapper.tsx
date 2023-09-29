'use client'
import { ChangeEvent, useState } from "react";

import { Reporte } from "@/interfaces/Formato";
import { CrearHipervinculo, SelectFormatos, TableBitacoras } from "."


interface Props {
    reporte: Reporte[];
    idusuario: number;
}

export const Wrapper = ({ reporte, idusuario }: Props) => {
    const [formato, setFormato] = useState("nada")

    const handleChangeFormato = async(e: ChangeEvent<HTMLSelectElement>) => {
        setFormato(e.target.value)
    }

    return (
        <>
            <div className=" lg:w-3/5 md:w-full sm:w-full bg-white p-10 rounded-lg">
                <SelectFormatos reporte={reporte} handleChangeFormato={handleChangeFormato} />
                <CrearHipervinculo />
            </div>

            <div className="w-full">
                <TableBitacoras idusuario={idusuario} formato={formato} />
            </div>
        </>
    )
}
