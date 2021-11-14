export interface Representative {
  name?: string;
  image?: string;
}
export interface Invoice {
  invId?: number;
  histId?: number;
  autorizador?: string;
  autorizacion?: string;
  autorizacionDevolucion?: string;
  consultaProtocolo?: string;
  consultaRegistro?: string;
  discapacidad?: string;
  estadoServicio?: string;
  datetime?: string;
  recepcionEventos?: string;
  tiempoMedio?: string;
}

export interface StateAvailable {
  id?: number;
  autorizador?: string;
  autorizacion?: number;
  autorizacionDevolucion?: number;
  consultaProtocolo?: number;
  consultaRegistro?: number;
  discapacidad?: number;
  estadoServicio?: number;
  recepcionEventos?: number;
  disponibilidadServicio?: number;
}

export interface CurrentSates{
    invId?: number;
    histId?: number,
    autorizador?: string;
    autorizacion?: string;
    autorizacionDevolucion?: string;
    consultaProtocolo?: string;
    consultaRegistro?: string;
    discapacidad?: string;
    estadoServicio?: string;
    datetime?: string;
    tiempoMedio?: string;
    recepcionEventos?: string;
}
