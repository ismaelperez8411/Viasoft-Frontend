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
  discapacidad?: number;
  consultaProtocolo?: number;
  estadoServicio?: number;
  consultaRegistro?: number;
  recepcionEventos?: number;
  disponibilidadServicio?: number;
}

export interface CurrentSates{
    invId?: number;
    histId?: number,
    autorizador?: string;
    autorizacion?: string;
    discapacidad?: string;
    autorizacionDevolucion?: string;
    consultaProtocolo?: string;
    estadoServicio?: string;
    tiempoMedio?: string;
    consultaRegistro?: string;
    datetime?: string;
    recepcionEventos?: string;
}
