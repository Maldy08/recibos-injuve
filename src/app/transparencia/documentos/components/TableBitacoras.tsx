'use client'
import { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { getBitacoras } from '../actions/client/bitacoras-action';
import { useTablaBitacora } from '../hooks/useTablaBitacora';
import { Progress } from '.';


interface Props {
    idusuario: number;
    formato: string;
}


export const TableBitacoras = ({ idusuario, formato }: Props) => {

    const {
        loading,
        setLoading,
        datos,
        setDatos,
        columnas,
        paginacionOpciones,
        customStyles } = useTablaBitacora();

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
            customStyles={customStyles}
            // conditionalRowStyles={conditionalRowStyles}
            pagination
            paginationPerPage={15}
            paginationRowsPerPageOptions={[15, 30, 45, 60, 75]}
            paginationComponentOptions={paginacionOpciones}
            data={datos}
            progressPending={loading}
            progressComponent={<Progress/>}
            noDataComponent={<p>Sin informacion a mostrar</p>}
            fixedHeader
            fixedHeaderScrollHeight="90%"
            // striped={true}
            dense={true}
        />
    )
}
