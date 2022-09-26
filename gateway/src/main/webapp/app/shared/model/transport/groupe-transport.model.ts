import { IZone } from 'app/shared/model/transport/zone.model';

export interface IGroupeTransport {
  id?: number;
  nom?: string;
  nombreEleves?: number;
  etat?: boolean;
  zones?: IZone[];
}

export class GroupeTransport implements IGroupeTransport {
  constructor(public id?: number, public nom?: string, public nombreEleves?: number, public etat?: boolean, public zones?: IZone[]) {
    this.etat = this.etat || false;
  }
}
