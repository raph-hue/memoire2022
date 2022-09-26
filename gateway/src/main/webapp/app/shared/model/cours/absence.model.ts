export interface IAbsence {
  id?: number;
  idEleve?: string;
  motif?: any;
  etat?: boolean;
  coursId?: number;
}

export class Absence implements IAbsence {
  constructor(public id?: number, public idEleve?: string, public motif?: any, public etat?: boolean, public coursId?: number) {
    this.etat = this.etat || false;
  }
}
