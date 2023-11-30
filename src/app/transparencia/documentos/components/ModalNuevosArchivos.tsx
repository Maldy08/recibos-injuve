import { Bitacoras } from "@/interfaces"

interface Props {
    data: Bitacoras[];
    onShowModalClick(): void
}


export const ModalNuevosArchivos = ({ data, onShowModalClick }: Props) => {
    return (
        <div>
            <div tabIndex={-1} aria-hidden="true" className=" backdrop:bg-gray-500  w-full justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className=" relative w-full max-w-xl max-h-full">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-4 border-b border-solid border-slate-200 rounded-t bg-primary-800 text-zinc-50">
                            <h3 className=" text-lg font-semibold">Hipervinculos generados</h3>
                            <button
                                type="button"
                                onClick={ onShowModalClick}
                                className="p-1 ml-auto border-0 text-white  float-right leading-none font-semibold outline-none focus:outline-none">
                                X
                            </button>
                        </div>
                        <div className="relative p-6 flex-auto">
                            <ol className=" max-w-lg space-y-1 text-gray-500 list-decimal list-inside dark:text-gray-400 text-sm">
                                {
                                   // data.length > 0 ?? 
                                        data.map( (bitacora) => {
                                            return (
                                                <li key={bitacora.id}>
                                                    <span className="font-semibold text-gray-900 dark:text-white text-xs">{ bitacora.hipervinculo }</span>
                                                </li>
                                            )
                                        })
                                }
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
        
    )
}

