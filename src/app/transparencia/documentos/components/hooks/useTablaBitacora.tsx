import { TablaBitacoras } from "@/interfaces";
import { useState } from "react"
import { TableColumn } from "react-data-table-component";
import { IoCopyOutline, IoTrashBinOutline } from "react-icons/io5";


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
                    onClick={() => alert(row.id)}
                >
                    <IoTrashBinOutline className="w-5 h-5 text-gray-700" />

                </button>
                <button
                    type="button"
                    onClick={() => alert(row.id)}
                >
                    <IoCopyOutline className="ml-2 w-5 h-5 text-gray-700" />

                </button>
            </>
    }


];

const customStyles = {

    headCells: {
        style: {
            // backgroundColor: '#1F2937',
            // color: 'white'
        },
    },

};

const paginacionOpciones = {
    rowsPerPageText: "Registros por Página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
};

export const useTablaBitacora = () => {

    const [datos, setDatos] = useState([])
    const [loading, setLoading] = useState(false)


    return {
        datos,
        setDatos,
        loading,
        setLoading,
        columnas,
        paginacionOpciones,
        customStyles,
    }
}
