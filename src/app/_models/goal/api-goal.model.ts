import * as Moment from 'moment-timezone';
import { Goal } from './goal.model';

export class ApiGoal extends Goal {
  public goal_category_id: number;
  public user_id: number;

  public constructor(data: ApiGoal) {
    super(data);
    if (data) {
      Object.keys(data).forEach((key: any, index: number) => {
        if (['start_at', 'end_at', 'finished_at'].indexOf(key) >= 0) {
          this[key] = Moment(data[key]).tz('Europe/Stockholm').format('YYYY-MM-DD');
        } else if (data[key] !== null && typeof data[key] !== 'undefined') {
          this[key] = data[key];
        }
      });
    }
  }
}
