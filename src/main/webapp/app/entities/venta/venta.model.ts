import dayjs from 'dayjs/esm';
import { ICoche } from 'app/entities/coche/coche.model';

export interface IVenta {
  id?: number;
  fecha?: dayjs.Dayjs;
  tipoPago?: string | null;
  coche?: ICoche | null;
}

export class Venta implements IVenta {
  constructor(public id?: number, public fecha?: dayjs.Dayjs, public tipoPago?: string | null, public coche?: ICoche | null) {}
}

export function getVentaIdentifier(venta: IVenta): number | undefined {
  return venta.id;
}
