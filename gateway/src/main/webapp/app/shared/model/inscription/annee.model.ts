export interface IAnnee {
  id?: number;
  nom?: string;
}

export class Annee implements IAnnee {
  constructor(public id?: number, public nom?: string) {}
}
