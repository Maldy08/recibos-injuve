'use client'
import DataTable, { TableColumn } from 'react-data-table-component';
import { TablaBitacoras } from '@/interfaces'
import { useEffect, useState } from 'react';
import { getBitacoras } from '../actions/client/bitacoras-action';
import { IoCopyOutline, IoPencilOutline, IoTrashBinOutline } from 'react-icons/io5';


const columnas: TableColumn<TablaBitacoras>[] = [
    {
        name: "Id",
        selector: (row: any) => row.id,
        width: "100px",

    },

    {
        name: 'Hipervinculo',
        selector: (row: any) => row.hipervinculo,
        minWidth: "250px",
        wrap: true
    },
    {
        name: 'Acciones',
        button: true,
        selector : ( row:any) => row.id,
        cell: (row:any) =>
            <>
            
                 <button 
                    type="button"
                    onClick={ () => alert(row.id)}
                >
                    <IoTrashBinOutline className="w-5 h-5 text-gray-700" />
                    
                </button> 
                 <button 
                    type="button"
                    onClick={ () => alert(row.id)}
                >
                    <IoCopyOutline className="ml-2 w-5 h-5 text-gray-700" />
                    
                </button> 
            </>
    }


];

const paginacionOpciones = {
    rowsPerPageText: "Registros por Página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

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
            pagination
            paginationPerPage={15}
            paginationRowsPerPageOptions={[15, 30, 45, 60, 75]}
            paginationComponentOptions={paginacionOpciones}
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
