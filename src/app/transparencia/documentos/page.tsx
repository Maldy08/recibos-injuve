import { Formato } from "@/interfaces/Formato";
import { getFormatos } from "./actions/documentos-actions";
import { SelectFormatos } from "./components/SelectFormatos";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const metadata = {
  title: 'CEABC - Repositorio de Transparencia - Documentos',
  description: 'CEABC - Repositorio de Transparencia - Documentos',
};


export default async function DocumentosPage() {
  const session = await getServerSession(authOptions);
 
  
  const { reporte } = await getFormatos( + (session?.user?.id!));

  return (
    <div>
      <form>
        <div className="grid gap-2 mb-6 grid-cols-1 ">
          <SelectFormatos reporte={reporte} />
        </div>
      </form>

    </div>
  );
}