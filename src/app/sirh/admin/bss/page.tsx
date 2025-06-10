import { TablaBSS } from "./components/TablaBSS";


export const metadata = {
  title: "INJUVE - Sistema Integral de Recursos Humanos - BSS",
     keywords: ["BSS", "Beneficios Sociales", "Subsidios", "Recibos INJUVE"],
    description: "Consulta y configuracion BSS - Bono de Seguridad Social",
};

export default async function BSSPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold flex items-center justify-center">Bono de Seguridad Social</h1>
      <div className="overflow-x-auto mx-auto px-4">
        {/* Aquí puedes incluir el componente de tabla o cualquier otro contenido relacionado con BSS */}
        <TablaBSS />
      </div>
    </div>
  );
}