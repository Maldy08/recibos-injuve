'use client'

import { Reporte } from "@/interfaces/Formato";
import { CrearHipervinculo, SelectFormatos, TableBitacoras } from "."
import { ChangeEvent, useEffect, useState } from "react";
import { TablaBitacoras } from "@/interfaces";
import { getBitacoras } from "../actions/client/bitacoras-action";

interface Props {
    reporte: Reporte[];
    idusuario: number;
}

export const Wrapper = ({ reporte, idusuario }: Props) => {
    const [formato, setFormato] = useState("nada")

    const [data, setData] = useState<TablaBitacoras[]>([ {
        id : 1,
        nombre: '',
        nombreReporte: '',
        hipervinculo: ''
    }])
    // const [loading, setLoading] = useState(true)
    const handleChangeFormato = (e: ChangeEvent<HTMLSelectElement>) => {
        setFormato(e.target.value)
        // setLoading( true)
        // console.log( e.target.value )
    }


    useEffect(() => {
        const getData = async () => {

            const data = await getBitacoras(idusuario, formato);
            console.log(data)
            setData( data )

        }

        getData();

    }, [formato])




    return (
        <>
            <div className=" lg:w-3/5 md:w-full sm:w-full bg-white p-10 rounded-lg">
                <SelectFormatos reporte={reporte} handleChangeFormato={handleChangeFormato} />
                <CrearHipervinculo />
            </div>

            <div className="w-full">


                <TableBitacoras data={data} datos={formato} />

            </div>
        </>
    )
}
