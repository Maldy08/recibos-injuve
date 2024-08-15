'use client'

import { Reporte } from "@/interfaces/Formato";
import { CrearHipervinculo, SelectFormatos, TableBitacoras } from "."
import { useWrapper } from "../hooks/useWrapper";


interface WrapperProps {
    reporte: Reporte[];
    idusuario: number;
    file_size_limit: number;
}

export const Wrapper = ({ reporte, idusuario, file_size_limit }: WrapperProps) => {

    const {
        formato,
        handleChangeFormato,
        deleteDataHandler,
        modalDelete,
        idbitacora,
        handleCancelDelete,
        reloadTable,
        handleReloadTable,
    } = useWrapper();


    return (
        <>
            <div className=" lg:w-1/2 md:w-full sm:w-full bg-white p-10 rounded-lg">
                <SelectFormatos
                    value={formato}
                    reporte={reporte}
                    handleChangeFormato={handleChangeFormato}
                />

                {/* Formulario */}
                <CrearHipervinculo
                    formato={formato}
                    idusuario={idusuario}
                    modalDelete={modalDelete}
                    idbitacora={idbitacora}
                    onCancel={handleCancelDelete}
                    handleReloadTable={handleReloadTable}
                    file_size_limit={file_size_limit}
                />
            </div>

            <div className="w-full rounded-xl">

                <TableBitacoras
                    idusuario={idusuario}
                    formato={formato}
                    onDeleteData={deleteDataHandler}
                    reload={ reloadTable }
                />
            </div>
        </>
    )
}
