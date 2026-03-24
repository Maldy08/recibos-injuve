import api from "@/app/lib/api-axios";

export interface Usuario {
  EMPLEADO: number;
  NOMBRE: string;
  CORREO: string;
  PASSWORD?: string;
  TIPO: number; // 1 = Base, 2 = Honorarios
}

export const UsuariosRepository = {
  getAll: async (): Promise<Usuario[]> => {
    const { data } = await api.get<Usuario[]>("usuarios");
    return data;
  },

  getById: async (id: number): Promise<Usuario> => {
    const { data } = await api.get<Usuario>(`usuarios/${id}`);
    return data;
  },

  create: async (usuario: Usuario): Promise<Usuario> => {
    const { data } = await api.post<Usuario>("usuarios", usuario);
    return data;
  },

  update: async (id: number, usuario: Partial<Usuario>): Promise<Usuario> => {
    const { data } = await api.put<Usuario>(`usuarios/${id}`, usuario);
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`usuarios/${id}`);
  },
};
