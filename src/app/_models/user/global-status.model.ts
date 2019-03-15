import { StatusKey } from './status-key.enum';
import { Status } from './status.model';

export class GlobalStatus {
  public amount_of_adolescents: number;
  public amount_of_contacts: number;
  public global_statuses: Status[] = [];
  public id: number;
  public is_me: boolean;

  constructor(data: GlobalStatus) {
    Object.keys(data).forEach((key: any, index: number) => {
      if (data[key] !== null && typeof data[key] !== 'undefined') {
        this[key] = data[key];
      }
    });
  }

  public getStatus(key: StatusKey): Status {
    return this.global_statuses.find((status: Status) => {
      return status.key === key;
    });
  }
}
