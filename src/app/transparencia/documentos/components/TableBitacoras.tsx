'use client'
import DataTable, { TableColumn } from 'react-data-table-component';
import { TablaBitacoras } from '@/interfaces'
import { useEffect, useState } from 'react';
import { getBitacoras } from '../actions/client/bitacoras-action';


const columnas: TableColumn<TablaBitacoras>[] = [
    {
        name: "Id",
        selector: (row: any) => row.id,
        width: "100px",

    },

    {
        name: 'Hipervinculo',
        selector: (row: any) => row.hipervinculo
    },


];





interface Props {
    idusuario: number;
    formato: string;
}


export const TableBitacoras = ({ idusuario, formato }: Props) => {

    const [datos, setDatos] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const getData = async () => {
            const { result } = await getBitacoras(idusuario, formato)
                .finally(() => setLoading(false))

            setDatos(result)
        }
        getData()
    }, [formato])


    return (
        <DataTable
            columns={columnas}
            // customStyles={estilos}
            // conditionalRowStyles={conditionalRowStyles}
            data={datos}
            progressPending={loading}
            progressComponent={<p>Cargando....</p>}
            noDataComponent={<p>Sin informacion a mostrar</p>}
            fixedHeader
            fixedHeaderScrollHeight="90%"
            // striped={true}
            dense={true}
        />
    )
}
