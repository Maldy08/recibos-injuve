

export interface Usuarios {
    login:             string;
    pass:              string;
    activo:            boolean;
    depto:             number;
    deptoDescripcion:  string;
    descripcion:       string;
    idPue:             number;
    noEmpleado:        number;
    nombreCompleto:    string;
    usuario:           number;
    municipio:         number;
    oficina:           number;
    compras:           boolean;
    comprasNivel:      number;
    almacen:           boolean;
    almacenNivel:      number;
    activos:           boolean;
    activosNivel:      number;
    contabilidad:      boolean;
    contabilidadNivel: number;
    presupuestos:      boolean;
    presupuestosNivel: number;
    nominas:           boolean;
    nominasNivel:      number;
    bd:                number;
    caja:              boolean;
    cajaNivel:         number;
    polnom:            string;
    vales:             boolean;
    valesNivel:        number;
    viaticos:          boolean;
    viaticosNivel:     number;
}
