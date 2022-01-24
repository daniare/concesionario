import { IMarca } from 'app/entities/marca/marca.model';
import { IModelo } from 'app/entities/modelo/modelo.model';

export interface ICoche {
  id?: number;
  matricula?: string;
  color?: string;
  precio?: number;
  marca?: IMarca | null;
  modelo?: IModelo | null;
  numeroSerie?: string;
}

export class Coche implements ICoche {
  constructor(
    public id?: number,
    public matricula?: string,
    public color?: string,
    public precio?: number,
    public marca?: IMarca | null,
    public modelo?: IModelo | null,
    public numeroSerie?: string
  ) {}
}

export function getCocheIdentifier(coche: ICoche): number | undefined {
  return coche.id;
}
