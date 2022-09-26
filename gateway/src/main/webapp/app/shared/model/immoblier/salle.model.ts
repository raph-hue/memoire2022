export interface ISalle {
  id?: number;
  nom?: string;
  nombre?: number;
  batimentId?: number;
}

export class Salle implements ISalle {
  constructor(public id?: number, public nom?: string, public nombre?: number, public batimentId?: number) {}
}
