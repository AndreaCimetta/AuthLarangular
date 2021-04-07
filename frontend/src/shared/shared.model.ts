import {DataObjectStatus} from './app-constants';

export class DataObject {
  rowVersion: number;
  status?: DataObjectStatus;

  constructor() {
    this.rowVersion = 0;
  }
}

export class Role {
  code: number;
  name: string;
}

export class Status {
  code: number;
  name: string;
}

export class Priority {
    code: string;
    name: string;
}
