import transparenciaApi from "@/app/api/transparencia-api";
import { Formato } from "@/interfaces/Formato";

export const getFormatos = async (id: number): Promise<Formato> => {
  const { data } = await transparenciaApi.get<Formato>(
    `${process.env.URL}/api/formatos/${id}`
  );
  return data;
};
