import { useMovimientoDetalles } from '../context/MovimientoDetalleContext';
import { useMovimientos } from '../context/MovimientoContext';
import { useSaldos } from '../context/SaldoContext';
import { Mov_Detalle } from '../types/movimiento_detalle';
import { comprobanteMap } from '../utils/comprobanteMap';
import { formatNumeroFactura } from '../utils/numeroFacturaMap';
import { Cliente } from '../types/cliente';
import './InformeCliente.css';
import { Movimiento } from '../types/movimiento';

type InformeClienteProps = {
  onBack: () => void;
  cliente: Cliente | null;
};

const InformeCliente = ({ onBack, cliente }: InformeClienteProps) => {
  const { movDetalles, isLoadingMovDetalles } = useMovimientoDetalles();
  const { movimientos, isLoadingMov } = useMovimientos();
  const { saldo, isLoadingSaldo } = useSaldos();

  const isLoading = isLoadingMovDetalles || isLoadingMov || isLoadingSaldo;

<<<<<<< HEAD
  // Formateador para números en formato regional argentino
  const formatter = new Intl.NumberFormat('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Obtener la fecha actual
  const fechaActual = new Date().toLocaleDateString('es-AR');

=======
  const Lamda = {
    titular: "MARTIN IGNACIO SERRANO",
    dni: 24892174,
    cuit: "23-24892174-9",
    tipoDeCuenta: "Caja de ahorro en pesos",
    numeroDeCuenta: "4007844-1 373-4",
    cbu: "0070373230004007844141",
    alias: "LAMDA.SER.MARTIN"
  }

>>>>>>> 74c1423031465a2cea716086b0ba5122f155e6e1
  // Función auxiliar para capitalizar la primera letra
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Obtener el saldo inicial del contexto o establecerlo en 0 si no está disponible
  const saldoInicial = saldo ? saldo.Monto : 0;
  const fechaCorte = saldo ? saldo.Fecha : '';
  console.log(movimientos[0].fecha)

  // Ordenar movimientos por fecha (más recientes primero)
  const sortedMovimientos = [...movimientos].sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

  // Agrupar detalles por movimiento
  const detallesPorMovimiento = movDetalles.reduce((acc, detalle) => {
    const { Codigo_Movimiento } = detalle;
    if (!acc[Codigo_Movimiento]) acc[Codigo_Movimiento] = [];
    acc[Codigo_Movimiento].push(detalle);
    return acc;
  }, {} as Record<number, Mov_Detalle[]>);

  // Función para agrupar movimientos por mes y año
  const agruparPorMes = () => {
    return sortedMovimientos.reduce((acc, mov) => {
      const [year, month] = mov.fecha.split('-');
      const mesYAnio = `${year}-${month}`;
      if (!acc[mesYAnio]) acc[mesYAnio] = [];
      acc[mesYAnio].push(mov);
      return acc;
    }, {} as Record<string, typeof movimientos>);
  };

  const movimientosPorMes = agruparPorMes();
  const saldoFinal = calcularSaldo(movimientos, saldoInicial);

  return (
    <div className="container m-0 p-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          Movimientos de {cliente?.Nombre} {cliente?.Apellido} 
          <span className="text-muted ms-2">({cliente?.Número.toString().padStart(3, '0')})</span>
        </h2>
        <div>
          <h4 className="mb-0">
            Saldo: <span className="text-success">${formatter.format(saldoFinal)}</span>
          </h4>
          <small className="text-muted">({fechaActual})</small>
        </div>
      </div>
      
      <button className="btn btn-secondary mb-4 no-print" onClick={onBack}>
        Volver
      </button>

      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : (
        <>
<<<<<<< HEAD
          {Object.entries(movimientosPorMes).map(([mesYAnio, movimientos]) => (
            <div key={mesYAnio} className="mb-4">
              <h4 className="text-secondary mb-3">
                {capitalizeFirstLetter(new Date(movimientos[0].fecha).toLocaleDateString('es-AR', { year: 'numeric', month: 'long' }))}
              </h4>

              {movimientos.map((mov) => (
                <div key={mov.codigo} className="mb-4">
                  <div className="border p-3 rounded bg-light">
                    <div className="justify-content-between d-flex">
                      <h5>
                        {comprobanteMap[mov.nombre_comprobante] || mov.nombre_comprobante}{' '}
                        <span className="text-success">${formatter.format(mov.importe_total)}</span>
                      </h5>
                      <p>
                        <strong>Número:</strong>{' '}
                        {formatNumeroFactura(detallesPorMovimiento[mov.codigo]?.[0]?.Punto_Venta_Detalle, mov.numero)}
                      </p>
                      <p>
                        <strong>Fecha:</strong> {new Date(mov.fecha).toLocaleDateString('es-AR')}
                      </p>
                    </div>
                    {['FA', 'FB', 'FC', 'FD'].includes(mov.nombre_comprobante) && (
                      <div>
                        <table className="table table-bordered mt-3">
                          <thead>
                            <tr>
                              <th>Artículo</th>
                              <th>Descripción</th>
                              <th>Cantidad</th>
                            </tr>
                          </thead>
                          <tbody>
                            {detallesPorMovimiento[mov.codigo]?.map((detalle) => (
                              <tr key={detalle.Numero_Movimiento}>
                                <td>{detalle.Articulo_Detalle}</td>
                                <td>{detalle.Descripcion_Detalle}</td>
                                <td>{detalle.Cantidad_Detalle}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
=======
          {Object.entries(movimientosPorMes).map(([mesYAnio, movimientos]) => {
            const movimientosFiltrados = fechaCorte
              ? movimientos.filter(mov => new Date(mov.fecha) >= new Date(fechaCorte))
              : movimientos;

            return (
              <div key={mesYAnio} className="mb-4">
                {/* Título del mes */}
                <h4 className="text-secondary mb-3">
                  {capitalizeFirstLetter(new Date(movimientos[0].fecha).toLocaleDateString('es-AR', { year: 'numeric', month: 'long' }))}
                </h4>

                {/* Listado de movimientos */}
                {movimientosFiltrados.map((mov) => (
                  <div key={mov.codigo} className="mb-4">
                    <div className="border p-3 rounded bg-light">
                      <div className="justify-content-between d-flex">
                        <h5>
                          {comprobanteMap[mov.nombre_comprobante] || mov.nombre_comprobante}{' '}
                          <span className="text-success">${mov.importe_total.toFixed(2)}</span>
                        </h5>
                        <p>
                          <strong>Número:</strong>{' '}
                          {formatNumeroFactura(detallesPorMovimiento[mov.codigo]?.[0]?.Punto_Venta_Detalle, mov.numero)}
                        </p>
                        <p>
                          <strong>Fecha:</strong> {new Date(mov.fecha).toLocaleDateString('es-AR')}
                        </p>
>>>>>>> 74c1423031465a2cea716086b0ba5122f155e6e1
                      </div>
                      {['FA', 'FB', 'FC', 'FD'].includes(mov.nombre_comprobante) && (
                        <div>
                          <table className="table table-bordered mt-3">
                            <thead>
                              <tr>
                                <th>Artículo</th>
                                <th>Descripción</th>
                                <th>Cantidad</th>
                              </tr>
                            </thead>
                            <tbody>
                              {detallesPorMovimiento[mov.codigo]?.map((detalle) => (
                                <tr key={detalle.Numero_Movimiento}>
                                  <td>{detalle.Articulo_Detalle}</td>
                                  <td>{detalle.Descripcion_Detalle}</td>
                                  <td>{detalle.Cantidad_Detalle}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

const calcularSaldo = (movimientos: Movimiento[], saldoInicial: number) => {
  return movimientos.reduce((saldo, mov) => {
    if (['FA', 'FB', 'FC', 'FD'].includes(mov.nombre_comprobante)) {
      return saldo + mov.importe_total;
    } else if (['RB A', 'RB B', 'NC A', 'NC B', 'NC C', 'NC E'].includes(mov.nombre_comprobante)) {
      return saldo - mov.importe_total;
    }
    return saldo;
  }, saldoInicial);
};

export default InformeCliente;
