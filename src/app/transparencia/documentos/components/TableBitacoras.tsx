'use client'
import DataTable, { TableColumn } from 'react-data-table-component';
import { TablaBitacoras } from '@/interfaces'
import { useEffect, useState } from 'react';
import { getBitacoras } from '../actions/client/bitacoras-action';


const columnas: TableColumn<TablaBitacoras>[] = [
    {
        name: "Reporte",
        selector: (row: any) => row.nombreReporte
    },
    {
        name: 'Nombre',
        selector: (row: any) => row.nombre
    },
    {
        name: 'Hipervinculo',
        selector: (row: any) => row.hipervinculo
    }
];


const estilos = {
    headRow: {
        style: {
            backgroundColor: "#632937",
            borderRadius: ".5em .5em 0 0",
            minHeight: "35px",

        },
    },
    head: {
        style: {
            fontSize: "16px",
            color: "#ffffff",
        },
    },

    rows: {
        style: {
            backgroundColor: "#f4f4f5",
            "&:nth-child(odd)": {
                backgroundColor: "#ffffff",
            },
            minHeight: "30px",
        },
    },
    headCells: {
        style: {
            alignItems: "center",
            justifyContent: "center",
        },
    },
};

interface Props {
    // idusuario: number;
    // formato:string;
    // loading: boolean;
    data: TablaBitacoras[];
    datos:string;
}

export const TableBitacoras = ({ data, datos }: Props) => {




    return (
        <>
        {
            data.length > 0 ?
                 data.map( (d) => <p>{ d.id}</p>)
                : <p>nada</p>
        }
        </>
        // <div className="flex flex-col">
        //     <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        //         <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
        //             <div className="overflow-hidden">
        //                 <table className="min-w-full text-left text-sm font-light">
        //                     <thead
        //                         className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
        //                         <tr>
        //                             <th scope="col" className="px-6 py-4">Id</th>
        //                             <th scope="col" className="px-6 py-4">Hipervinculo</th>
        //                             <th scope="col" className="px-6 py-4">Acciones</th>
        //                         </tr>
        //                     </thead>
        //                     <tbody>

        //                         {
        //                             !loading ?
        //                             data.map(({ id, nombreReporte, nombre, hipervinculo }) => (

        //                                 <tr key={ id }
        //                                     className="border-b bg-white dark:border-neutral-500 dark:bg-neutral-600">
        //                                     <td className="whitespace-nowrap px-6 py-4 font-medium">{ id }</td>
        //                                     <td className="whitespace-nowrap px-6 py-4">{ hipervinculo }</td>
        //                                     <td className="whitespace-nowrap px-6 py-4"></td>
        //                                 </tr>
        //                             ))
        //                                 :
        //                                 <>sin datos</>

        //                         }


        //                     </tbody>
        //                 </table>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}
