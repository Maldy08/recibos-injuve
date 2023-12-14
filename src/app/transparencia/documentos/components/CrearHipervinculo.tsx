'use client'

import Image from "next/image";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useCrearHipervinculo } from "../hooks/useCrearHipervinculo";
import { LoadingButton, ModalEliminar, ModalNuevosArchivos } from ".";
import { Bitacoras } from "@/interfaces";

interface Props {
    formato: string;
    idusuario: number;
    modalDelete: boolean;
    idbitacora: number;
    onCancel: () => void;
    handleReloadTable: () => void;
    file_size_limit:number;
}

export const CrearHipervinculo = ({
    formato,
    idusuario,
    modalDelete,
    idbitacora,
    onCancel,
    handleReloadTable,
    file_size_limit }: Props) => {

    const setBitacorasResponse = (data: Bitacoras[]) => setBitacoras(data);

    const {
        inputArchivo,
        archivo,
        handleChangeFile,
        handleChangePeriodo,
        periodo,
        trimestre,
        handleChangeTrimestre,
        onFormSubmit,
        progress,
        modal,
        setModal,
        bitacoras,
        setBitacoras,
        submit,
        handleDeleteBitacora,


    } = useCrearHipervinculo({
        formato,
        idusuario,
        setBitacorasResponse,
        idbitacora,
        file_size_limit,

    });


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
                         h-80 border-4 border-dashed border-gray-600 rounded-lg bg-gray-200
                         dark:bg-gray-700 ">
                    {
                        archivo === null
                            ?
                            (
                                <>
                                    <IoCloudUploadOutline className=" w-14 h-14" />
                                    <span>Click aquí para subir archivos</span>
                                </>
                            )
                            :
                            (
                                <div className="max-h-80 overflow-auto">
                                    {
                                        archivo.map((a) => {
                                            const regex = new RegExp("[^.]+$");
                                            const extension = a.name.match(regex);
                                            return (
                                                <div key={a.name} className="flex flex-wrap">
                                                    <Image
                                                        src={`/assets/${extension![0].toString()}.png`}
                                                        alt="icono"
                                                        width={25}
                                                        height={25}
                                                    />
                                                    <span className="text-xs ml-2">{a.name}</span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                    }

                    <label htmlFor="archivos" className="hidden">archivo</label>
                    <input
                        onChange={handleChangeFile}
                        ref={inputArchivo}
                        type="file"
                        name="archivos"
                        id="archivos"
                        multiple={true}
                        accept=".doc,.docx,.xls,.xlsx,.pdf"
                        className=" hidden"
                    />
                </section>

                <div className="mt-4">
                    <button
                        disabled={submit}
                        type="submit"
                        className=" float-right w-52 text-white bg-primary-900 hover:bg-primary-800 
                            focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg
                            text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700
                          dark:focus:ring-primary-800 transition-all"
                    >
                        {submit ? <LoadingButton /> : 'Crear'}
                    </button>

                    <p className=" text-xs"><i>* Caracteres permitidos: 50</i></p>
                    
                    <p className=" text-xs"><i>* Tamaño de archivo: 8mb</i></p>
                </div>
                {/* {
                    progress != 0 &&
                    <div className="">
                        <div className="flex w-full bg-gray-200 rounded-full dark:bg-gray-700">
                            <div className=" bg-primary-800 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: progress + '%' }}>
                                {progress + '%'}
                            </div>
                        </div>
                    </div>
                } */}

                {
                    modal && 
                    <ModalNuevosArchivos
                        data={bitacoras}
                        isOpen={modal}
                        onShowModalClick={() => setModal((prev) => !prev)}
                        handleReloadTable={handleReloadTable}
                    />
                }

                {
                    modalDelete && 
                    <ModalEliminar 
                        onCancel={onCancel} 
                        idbitacora={idbitacora} 
                        onDelete={handleDeleteBitacora}  
                        handleReloadTable={handleReloadTable}
                    />
                }
            </form>
        </div>
    )
}
