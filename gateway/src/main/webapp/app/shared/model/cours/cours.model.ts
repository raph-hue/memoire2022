import { IAbsence } from 'app/shared/model/cours/absence.model';

export interface ICours {
  id?: number;
  idMatiere?: string;
  idClasse?: string;
  idAnnee?: string;
  absences?: IAbsence[];
  enseignantId?: number;
  horaireId?: number;
}

export class Cours implements ICours {
  constructor(
    public id?: number,
    public idMatiere?: string,
    public idClasse?: string,
    public idAnnee?: string,
    public absences?: IAbsence[],
    public enseignantId?: number,
    public horaireId?: number
  ) {}
}
