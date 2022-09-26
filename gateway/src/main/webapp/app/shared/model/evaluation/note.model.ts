export interface INote {
  id?: number;
  note?: number;
  eleve?: string;
  apperciation?: any;
  evaluationId?: number;
}

export class Note implements INote {
  constructor(public id?: number, public note?: number, public eleve?: string, public apperciation?: any, public evaluationId?: number) {}
}
