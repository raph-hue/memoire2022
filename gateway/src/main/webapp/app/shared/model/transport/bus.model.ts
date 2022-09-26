export interface IBus {
  id?: number;
  matricule?: string;
  numero?: string;
  nombreplace?: number;
  chauffeurId?: number;
}

export class Bus implements IBus {
  constructor(
    public id?: number,
    public matricule?: string,
    public numero?: string,
    public nombreplace?: number,
    public chauffeurId?: number
  ) {}
}
