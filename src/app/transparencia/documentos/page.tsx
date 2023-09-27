import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getFormatos } from "./actions/documentos-actions";
import { CrearHipervinculo, SelectFormatos, TablaBitacoras } from "./components";

export const metadata = {
  title: 'CEABC - Repositorio de Transparencia - Documentos',
  description: 'CEABC - Repositorio de Transparencia - Documentos',
};


export default async function DocumentosPage() {

  const session = await getServerSession(authOptions);
  const { reporte } = await getFormatos(+ (session?.user?.id!));

  return (
    <div className="flex gap-5">
      <div className=" lg:w-3/5 md:w-full sm:w-full bg-white p-10 rounded-lg">
        <SelectFormatos reporte={reporte} />
        <CrearHipervinculo />
      </div>

      <div className="w-full">
        <TablaBitacoras />
      </div>
    </div>
  );
}