export interface IGroupeCantine {
  id?: number;
  nom?: string;
  nombreEleves?: number;
  cantineId?: number;
}

export class GroupeCantine implements IGroupeCantine {
  constructor(public id?: number, public nom?: string, public nombreEleves?: number, public cantineId?: number) {}
}
