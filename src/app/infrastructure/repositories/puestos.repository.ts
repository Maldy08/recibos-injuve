import api from "@/app/lib/api-axios";
import { Puesto } from "@/app/domain/entities/puesto";

export const PuestosRepository = {
  getAll: async (): Promise<Puesto[]> => {
    const { data } = await api.get<Puesto[]>("puestos");
    return data;
  },

  create: async (puesto: Puesto): Promise<Puesto> => {
    const { data } = await api.post<Puesto>("puestos", puesto);
    return data;
  },

  update: async (id: number, descripcion: string): Promise<Puesto> => {
    const { data } = await api.put<Puesto>(`puestos/${id}`, { DESCRIPCION: descripcion });
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`puestos/${id}`);
  },
};
