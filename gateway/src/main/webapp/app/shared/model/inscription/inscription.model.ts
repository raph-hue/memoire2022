import { Moment } from 'moment';
import { Etat } from 'app/shared/model/enumerations/etat.model';

export interface IInscription {
  id?: number;
  dateInscription?: Moment;
  classe?: string;
  statut?: Etat;
  eleveId?: number;
  anneeId?: number;
}

export class Inscription implements IInscription {
  constructor(
    public id?: number,
    public dateInscription?: Moment,
    public classe?: string,
    public statut?: Etat,
    public eleveId?: number,
    public anneeId?: number
  ) {}
}
