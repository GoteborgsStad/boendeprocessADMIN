import { Goal } from '../goal/goal.model';
import { User } from '../user/user.model';

export class Plan {
  public id: number;
  public name: string;
  public description: string;
  public user: User;
  public goals: Goal[] = [];
  public created_at: string;
  public updated_at: string;
  public amount_of_finished_goals: number = 0;
  public amount_of_goals: number = 0;

  constructor(data: Plan) {
    if (data) {
      Object.keys(data).forEach((key: any, index: number) => {
        if (key === 'goals') {
          data[key].forEach((goal: Goal) => {
            this[key].push(new Goal(goal));
          });
        } else if (data[key] !== null && typeof data[key] !== 'undefined') {
          this[key] = data[key];
        }
      });
    }
  }
}
