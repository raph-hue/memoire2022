import { Moment } from 'moment';
import { ICours } from 'app/shared/model/cours/cours.model';

export interface IHoraire {
  id?: number;
  horaire?: Moment;
  cours?: ICours[];
}

export class Horaire implements IHoraire {
  constructor(public id?: number, public horaire?: Moment, public cours?: ICours[]) {}
}
