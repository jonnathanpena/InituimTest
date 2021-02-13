import { Action } from '@ngrx/store';
import { Queue } from '../../models/Queue';

export enum ApplicationActionTypes {
  LOAD = '[QUEUE] LOAD',
  UPDATEDATA = '[QUEUE] UPDATEDATA',
  RELOADDATA = '[QUEUE] RELOADDATA',
}

export class Load implements Action {
  readonly type = ApplicationActionTypes.LOAD;
}

export class UpdateData implements Action {
  readonly type = ApplicationActionTypes.UPDATEDATA;
  constructor(public payload: Queue[]) {}
}

export class ReloadData implements Action {
  readonly type = ApplicationActionTypes.RELOADDATA;
  constructor(public payload: boolean) {}
}

export type ApplicationActionUnion = Load | UpdateData | ReloadData;
