import Link from "next/link"
import { IoDocumentAttachOutline, IoHomeOutline } from "react-icons/io5"


export const Sidebar = () => {
    return (
        <>
            <aside id="default-sidebar" className=" top-0 left-0 w-60 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-200 dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link href={'/transparencia'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group transition-all">
                                <IoHomeOutline className=" w-6 h-6 text-gray-800 " />
                                <span className="flex-1 ml-1 whitespace-nowrap  text-gray-500 ">Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/transparencia/documentos'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group transition-all">
                                <IoDocumentAttachOutline className=" w-6 h-6 text-gray-800 " />
                                <span className="flex-1 ml-1 whitespace-nowrap  text-gray-500">Documentos</span>
                            </Link>
                        </li>
                        {/* <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Inbox</span>
                            </a>
                        </li> */}

                    </ul>
                </div>
            </aside>
        </>
    )
}
//IoDocumentAttachOutline