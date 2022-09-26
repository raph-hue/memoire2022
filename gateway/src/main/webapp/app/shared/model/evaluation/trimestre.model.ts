import { Moment } from 'moment';

export interface ITrimestre {
  id?: number;
  dateDebut?: Moment;
  dateFin?: Moment;
  annee?: string;
}

export class Trimestre implements ITrimestre {
  constructor(public id?: number, public dateDebut?: Moment, public dateFin?: Moment, public annee?: string) {}
}
