import { ChangeEvent, useState } from "react"


export const useWrapper = () => {
    const [formato, setFormato] = useState("Seleccione un formato")
    const [modalDelete, setmodalDelete] = useState(false);
    const [idbitacora, setIdbitacora] = useState(0);
    const [reloadTable, setreloadTable] = useState(false);


    const handleChangeFormato = async(e: ChangeEvent<HTMLSelectElement>) => {
        setFormato(e.target.value)
    }
    const deleteDataHandler = (idbitacora:number) => {
        setmodalDelete(true);
        setIdbitacora(idbitacora);
    }

    const handleCancelDelete = () => setmodalDelete(false);

    const handleReloadTable = () => setreloadTable((prev) => !prev);



    return {
        formato,
        setFormato,
        handleChangeFormato,
        deleteDataHandler,
        idbitacora,
        modalDelete,
        handleCancelDelete,
        reloadTable,
        handleReloadTable,

    }
}
