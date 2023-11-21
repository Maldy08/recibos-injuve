import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getFormatos } from "./actions/documentos-actions";
import { Wrapper } from "./components/Wrapper";

export const metadata = {
  title: 'CEABC - Repositorio de Transparencia - Documentos',
  description: 'CEABC - Repositorio de Transparencia - Documentos',
};


export default async function DocumentosPage() {

  const session = await getServerSession(authOptions);
  const { reporte } = await getFormatos(+ (session?.user?.id!));

  return (
    <div className="flex gap-5">
      <Wrapper reporte={ reporte } idusuario={+( session?.user?.id!)}/>
    </div>
  );
}

// +( session?.user?.id!) 