import { Empleado } from "@/app/domain/entities/empleado";

export interface LoginResponse {
    token: string;
    empleado: Empleado;
  }