import { Moment } from 'moment';

export interface IPaiement {
  id?: number;
  type?: string;
  datePaiement?: Moment;
  moisId?: number;
}

export class Paiement implements IPaiement {
  constructor(public id?: number, public type?: string, public datePaiement?: Moment, public moisId?: number) {}
}
