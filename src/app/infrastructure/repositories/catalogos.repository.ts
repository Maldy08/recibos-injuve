import api from "@/app/lib/api-axios";
import { CatalogRecord } from "@/app/sirh/admin/catalogos/types";

export const CatalogosRepository = {
  async getAll(endpoint: string): Promise<CatalogRecord[]> {
    const { data } = await api.get<CatalogRecord[]>(endpoint);
    return data;
  },

  async getById(endpoint: string, id: number): Promise<CatalogRecord> {
    const { data } = await api.get<CatalogRecord>(`${endpoint}/${id}`);
    return data;
  },

  async create(endpoint: string, payload: CatalogRecord): Promise<CatalogRecord> {
    const { data } = await api.post<CatalogRecord>(endpoint, payload);
    return data;
  },

  async update(endpoint: string, id: number, payload: CatalogRecord): Promise<CatalogRecord> {
    const { data } = await api.put<CatalogRecord>(`${endpoint}/${id}`, payload);
    return data;
  },

  async remove(endpoint: string, id: number): Promise<void> {
    await api.delete(`${endpoint}/${id}`);
  },
};
