'use client'

import Image from "next/image";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useCrearHipervinculo } from "../hooks/useCrearHipervinculo";

interface Props {
    formato:string;
    idusuario:number;
}

export const CrearHipervinculo = ({ formato, idusuario } : Props) => {

    const {
        inputArchivo,
        archivo,
        src,
        handleChangeFile,
        handleChangePeriodo,
        periodo,
        trimestre,
        handleChangeTrimestre,
        onFormSubmit 
    } = useCrearHipervinculo({ formato , idusuario });


    return (
        <div className="mt-12">
            <form className="" onSubmit={onFormSubmit}>
                <div className=" grid grid-cols-2 gap-2">
                    <div className="">
                        <label
                            htmlFor="periodo"
                            className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                        >
                            Periodo
                        </label>

                        <input
                            onChange={handleChangePeriodo}
                            type="number"
                            id="periodo"
                            min={2022}
                            max={2023}
                            value={periodo}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                             rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                             dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                             dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />

                    </div>

                    <div>
                        <label
                            htmlFor="trimestre"
                            className="block mb-2 text-md font-medium text-gray-900
                         dark:text-white"
                        >
                            Trimestre
                        </label>

                        <select
                            onChange={handleChangeTrimestre}
                            value={trimestre}
                            id="trimestre"
                            className="bg-gray-50 border border-gray-300 text-gray-900
                            text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 
                            block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                             dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                            dark:focus:border-blue-500"
                        >
                            <option disabled>Seleccione un trimestre</option>
                            <option value={""} >1er trimestre</option>
                            <option >2do trimestre</option>
                            <option >3er trimestre</option>
                            <option >4to trimestre</option>

                        </select>
                    </div>
                </div>

                <section
                    onClick={() => { inputArchivo.current?.click() }}
                    className=" cursor-pointer mt-6 flex flex-col w-full  justify-center items-center
                      h-40 border-4 border-dashed border-gray-600 rounded-lg bg-gray-200
                     dark:bg-gray-700 ">
                    {
                        !archivo
                            ?
                            (
                                <>
                                    <IoCloudUploadOutline className=" w-14 h-14" />
                                    <span>Click aquí spanara subir archivo</span>
                                </>
                            )
                            :
                            (
                                <>
                                    <Image
                                        src={src}
                                        alt="icono"
                                        width={50}
                                        height={50}
                                    />
                                    <span className="text-sm">{archivo.name}</span>
                                </>
                            )
                    }

                    <label htmlFor="archivos" className="hidden">archivo</label>
                    <input
                        onChange={handleChangeFile}
                        ref={inputArchivo}
                        type="file"
                        name="archivos"
                        id="archivos"
                        accept=".doc,.docx,.xls,.xlsx,.pdf"
                        className=" hidden"
                    />
                </section>

                <div className="mt-4">
                    <button
                        type="submit"
                        className=" float-right w-52 text-white bg-primary-900 hover:bg-primary-800 
                            focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg
                            text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700
                          dark:focus:ring-primary-800 transition-all"
                    >
                        Crear
                    </button>
                </div>

            </form>
        </div>
    )
}
