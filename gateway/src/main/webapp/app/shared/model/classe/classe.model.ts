export interface IClasse {
  id?: number;
  nom?: string;
  mensualite?: string;
  niveauId?: number;
}

export class Classe implements IClasse {
  constructor(public id?: number, public nom?: string, public mensualite?: string, public niveauId?: number) {}
}
