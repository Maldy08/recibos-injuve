import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const metadata = {
  title: 'INJUVE - Sistema Integral de Recursos Humanos',
  description: 'Consulta de Recibos de Nómina',
};

export default async function OficiosPage() {
 // redirect('/sirh/recibos');
 const session = await getServerSession(authOptions);
  if (!session) {
      redirect('/login');
    }



  return (
    <div>
      
    </div>
  );
}