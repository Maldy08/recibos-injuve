import { Usuarios } from "@/app/domain/entities/usuario";


export class UsuariosMapper {
  static mapFromApiToDomain(result: Usuarios): Usuarios {
    return {
      login: result.login,
      pass: result.pass,
      activo: result.activo,
      depto: result.depto,
      deptoDescripcion: result.deptoDescripcion,
      descripcion: result.descripcion,
      idPue: result.idPue,
      noEmpleado: result.noEmpleado,
      nombreCompleto: result.nombreCompleto,
      usuario: result.usuario,
      municipio: result.municipio,
      oficina: result.oficina,
      compras: result.compras,
      comprasNivel: result.comprasNivel,
      almacen: result.almacen,
      almacenNivel: result.almacenNivel,
      activos: result.activos,
      activosNivel: result.activosNivel,
      contabilidad: result.contabilidad,
      contabilidadNivel: result.contabilidadNivel,
      presupuestos: result.presupuestos,
      presupuestosNivel: result.presupuestosNivel,
      nominas: result.nominas,
      nominasNivel: result.nominasNivel,
      bd: result.bd,
      caja: result.caja,
      cajaNivel: result.cajaNivel,
      polnom: result.polnom,
      vales: result.vales,
      valesNivel: result.valesNivel,
      viaticos: result.viaticos,
      viaticosNivel: result.viaticosNivel,
    };
  }
}
``;
