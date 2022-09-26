import { Moment } from 'moment';

export interface IProgrammeTransport {
  id?: number;
  heurDepart?: Moment;
  dateDepart?: Moment;
  groupeTransportId?: number;
  busId?: number;
}

export class ProgrammeTransport implements IProgrammeTransport {
  constructor(
    public id?: number,
    public heurDepart?: Moment,
    public dateDepart?: Moment,
    public groupeTransportId?: number,
    public busId?: number
  ) {}
}
