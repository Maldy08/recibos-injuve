import { UsuariosRepository } from "@/app/application/interfaces/usuarios-repository";
import { Usuarios } from "@/app/domain/entities/usuario";
import { DbAdapter } from "../adapters/db.adapter";
import { UsuariosMapper } from "../mappers/usuarios.mapper";
import { Result } from "postcss";



export class UsuariosRepositoryHttpImplementation implements UsuariosRepository {

    async getAllUsers(): Promise<Usuarios[]> {
        const { data } = await DbAdapter.get<Result<Usuarios[]>>(
          "Usuario/GetAllUsuarios"
        );
    
        return data.map((usuario) => UsuariosMapper.mapFromApiToDomain(usuario));
      }
    
      async getUserById(id: number): Promise<Usuarios> {
        const { data } = await DbAdapter.get<Result<Usuarios>>(
          `Usuario/GetUserById?id=${id}`
        );
        
        return UsuariosMapper.mapFromApiToDomain(data);
  }
}