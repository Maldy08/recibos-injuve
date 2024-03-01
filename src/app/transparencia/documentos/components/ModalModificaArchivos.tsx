import { Bitacoras } from "@/interfaces";

interface Props { 
   // data: Bitacoras[];
    onShowModalClick(): void
    isOpen:boolean;
    handleReloadTable: () => void;

}


export const  ModalModificaArchivos = ({  onShowModalClick , isOpen, handleReloadTable}: Props) => { 
    return (
        <div>
        <div tabIndex={-1}   
            className={ !isOpen ? "backdrop:bg-gray-700 animate-openmodal w-full justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                : " animate-closemodal w-full justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                
            }>
            <div className=" relative flex max-h-full">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-4 border-b border-solid border-slate-200 rounded-t bg-primary-800 text-zinc-50">
{/*                             <button
                            type="button"
                            onClick={onShowModalClick}
                            className="p-1 ml-auto border-0 text-white  float-right leading-none font-semibold outline-none focus:outline-none">
                            X
                        </button> */}
                    </div>
                    <div className="relative p-4 m-4 flex-auto">
                        <p>
                            Se han reemplazado los archivos exitosamente!
                        </p>

                    </div>

                    <div className="flex justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button 
                            type="button" 
                            onClick={ () => {
                                onShowModalClick()
                                handleReloadTable()
                            }}
                            className="text-white bg-primary-800 hover:bg-prymary-800 focus:ring-4 
                                        focus:outline-none focus:ring-primary-400 font-medium rounded-lg 
                                        text-sm px-5 py-2.5 text-center"
                        >
                            Continuar
                        </button>
                    </div>

                </div>
            </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>

    )
}