export interface IMarca {
  id?: number;
  nombre?: string;
}

export class Marca implements IMarca {
  constructor(public id?: number, public nombre?: string) {}
}

export function getMarcaIdentifier(marca: IMarca): number | undefined {
  return marca.id;
}
