'use client'
import { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { getBitacoras } from '../actions/client/bitacoras-action';
import { Progress } from '.';
import { IoCopyOutline, IoTrashBinOutline } from 'react-icons/io5';
import { TablaBitacoras } from '@/interfaces';


interface Props {
    idusuario: number;
    formato: string;
    onDeleteData:( idbitacora:number) => void;
    reload: boolean;
}


export const TableBitacoras = ({ idusuario, formato, onDeleteData, reload }: Props) => {

    const [datos, setDatos] = useState([])
    const [loading, setLoading] = useState(false)

    const paginacionOpciones = {
        rowsPerPageText: "Registros por Página",
        rangeSeparatorText: "de",
        selectAllRowsItem: true,
        selectAllRowsItemText: "Todos",
    };

    
    const columnas: TableColumn<TablaBitacoras>[] = [
        {
            name: "ID",
            selector: (row: any) => row.id,
            width: "100px",

        },

        {
            name: 'HÍPERVINCULO',
            selector: (row: any) => row.hipervinculo,
            minWidth: "250px",
            wrap: true
        },
        {
            name: 'ACCIÓNES',
            button: true,
            selector: (row: any) => row.id,
            cell: (row: any) =>
                <>
                    <button
                        type="button"
                        onClick={ () => onDeleteData(row.id)}
                    >
                        <IoTrashBinOutline className="w-5 h-5 text-gray-700" />
                    </button>

                    <button
                        type="button"
                    >
                        <IoCopyOutline className="ml-2 w-5 h-5 text-gray-700" />
                    </button>
                </>
        }

    ];


    useEffect(() => {
        setLoading(true)
        setDatos([])
        const getData = async () => {
            console.log(formato);
            console.log(idusuario);
            const { result } = await getBitacoras(idusuario, formato)
                .finally(() => setLoading(false))

            setDatos(result)
        }
        getData()
    }, [formato, reload])


    return (
        <DataTable
            columns={columnas}
            // customStyles={customStyles}
            // conditionalRowStyles={conditionalRowStyles}
            pagination
            paginationPerPage={15}
            paginationRowsPerPageOptions={[15, 30, 45, 60, 75]}
            paginationComponentOptions={paginacionOpciones}
            data={datos}
            highlightOnHover={true}
            progressPending={loading}
            progressComponent={<Progress />}
            noDataComponent={<p>Sin informacion a mostrar</p>}
            fixedHeader
            fixedHeaderScrollHeight="90%"
            // striped={true}
            dense={true}
        />
    )
}
