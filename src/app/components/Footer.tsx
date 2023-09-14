
const sistema = process.env.NOMBRE_SISTEMA?.toUpperCase();


export const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 z-20 w-full lg:h-2 p-4 bg-gray-800 border-t-4 border-secondary-500 shadow md:flex items-center justify-center md:p-6  ">
      <span className=" text-xs text-white sm:text-center dark:text-gray-400">
        { `COMISION ESTATAL DEL AGUA DE BAJA CALIFORNIA - 2023 © ${ sistema }`} 
      </span>
    </footer>
  )
}
