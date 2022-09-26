import { Moment } from 'moment';
import { Sexe } from 'app/shared/model/enumerations/sexe.model';

export interface IEleve {
  id?: number;
  matricule?: string;
  prenom?: string;
  nom?: string;
  sexe?: Sexe;
  adresse?: any;
  telephone?: string;
  email?: string;
  dateNaissance?: Moment;
  lieuNaissance?: string;
  tuteurId?: number;
}

export class Eleve implements IEleve {
  constructor(
    public id?: number,
    public matricule?: string,
    public prenom?: string,
    public nom?: string,
    public sexe?: Sexe,
    public adresse?: any,
    public telephone?: string,
    public email?: string,
    public dateNaissance?: Moment,
    public lieuNaissance?: string,
    public tuteurId?: number
  ) {}
}
