import axios from "axios";
import { CatalogRecord } from "@/app/sirh/admin/catalogos/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/backend/";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

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
