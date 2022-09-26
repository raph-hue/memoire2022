import { Moment } from 'moment';

export interface IEvaluation {
  id?: number;
  type?: string;
  dateEvaluation?: Moment;
  classe?: string;
  matiere?: string;
  trimestreId?: number;
}

export class Evaluation implements IEvaluation {
  constructor(
    public id?: number,
    public type?: string,
    public dateEvaluation?: Moment,
    public classe?: string,
    public matiere?: string,
    public trimestreId?: number
  ) {}
}
