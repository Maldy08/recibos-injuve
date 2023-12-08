import { redirect } from "next/navigation";
export const metadata = {
  title: 'CEABC - Repositorio de Transparencia',
  description: 'CEABC - Repositorio de Transparencia',
};

export default async function TransparenciaPage() {
  redirect('/transparencia/documentos');
}