import { Usuarios } from "@/app/domain/entities/usuario";

export interface UsuariosRepository {

    getUserById(id: number): Promise<Usuarios>;
    getAllUsers(): Promise<Usuarios[]>;

}