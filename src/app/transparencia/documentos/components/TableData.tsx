'use client'
import { Bitacoras, TablaBitacoras } from "@/interfaces";
import { useEffect, useState } from "react";
import { getBitacoras } from "../actions/client/bitacoras-action";

interface Props {
    idusuario: number;
    formato: string;

}


export const TableData = ( { idusuario, formato } : Props) => {

    const [datos, setDatos] = useState([] as Bitacoras[])
    useEffect(() => {
        setDatos([])
        const getData = async () => {
            // console.log(formato);
            //console.log(idusuario);
            const { result } = await getBitacoras(idusuario, formato)
            console.log(result)
            setDatos(result)
        }
        getData()
    }, [])
    
  return (
   <div>
         {datos.map((item, index) => (
              <div key={index}>
                <p>
                    {item.nombre}
                </p>
              </div>
         ))}
   </div>
  )
}
