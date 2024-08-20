import { UsuariosRepository } from "@/app/application/interfaces/usuarios-repository";
import { Usuarios } from "@/app/domain/entities/usuario";

export class GetAllUsersUseCase {
    constructor(private usuariosRepository: UsuariosRepository) { }

    async execute(): Promise<Usuarios[]> {
        return this.usuariosRepository.getAllUsers();
    }
}