import { IPaiement } from 'app/shared/model/paiement/paiement.model';

export interface IMois {
  id?: number;
  nom?: string;
  paiements?: IPaiement[];
}

export class Mois implements IMois {
  constructor(public id?: number, public nom?: string, public paiements?: IPaiement[]) {}
}
