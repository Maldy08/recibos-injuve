import axios from "axios";
import { Categoria } from "@/app/domain/entities/categoria";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/backend/";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const CategoriasRepository = {
  getAll: async (): Promise<Categoria[]> => {
    const { data } = await api.get<Categoria[]>("categorias");
    return data;
  },

  create: async (categoria: Categoria): Promise<Categoria> => {
    const { data } = await api.post<Categoria>("categorias", categoria);
    return data;
  },

  update: async (id: number, descripcion: string, sueldo: string): Promise<Categoria> => {
    const { data } = await api.put<Categoria>(`categorias/${id}`, { DESCRIPCION: descripcion, SUELDO: sueldo });
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`categorias/${id}`);
  },
};
