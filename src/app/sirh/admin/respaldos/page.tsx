import TablaRespaldos from "./components/TablaRespaldos";

export const metadata = {
  title: "INJUVE - Sistema Integral de Recursos Humanos - Respaldos",
  keywords: ["Respaldos", "Base de Datos", "MDB", "Recibos INJUVE"],
  description: "Gestión y descarga de respaldos de base de datos",
};

export default function RespaldosPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold flex items-center justify-center">
        Respaldos de Base de Datos
      </h1>
      <div className="overflow-x-auto mx-auto px-4 mt-4">
        <TablaRespaldos />
      </div>
    </div>
  );
}
