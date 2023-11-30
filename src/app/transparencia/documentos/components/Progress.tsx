
export const Progress = () => {
    return (
        <div className=" p-4">
            <div className="flex flex-col items-center">
                <div
                    className="inline-block h-8 w-8 animate-spin rounded-full  border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary-900 motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status">
                    <span
                        className="!absolute !-m-px !h-px !w-px !overflow-hidden 
                        !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
                </div>
                <span className="p-2 text-sm animate-pulse">Cargando....</span>
            </div>
        </div>
    )
}
