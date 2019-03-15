import { Plan } from '../plan/plan.model';
import { GoalCategory } from './goal-category.model';
import { GoalStatus } from './goal-status.model';

export class Goal {
  public id: number;
  public name: string;
  public description: string;
  public start_at: string;
  public end_at: string;
  public accepted_at: string;
  public finished_at: string;
  public color: string;
  public is_toggled: boolean;
  public goal_category: GoalCategory;
  public goal_status: GoalStatus;
  public plan: Plan;
  public created_at: string;
  public updated_at: string;

  public constructor(goal?: Goal) {
    if (goal) {
      Object.keys(goal).forEach((key: any, index: number) => {
        if (key === 'goal_category') {
          this[key] = new GoalCategory(goal[key]);
        } else if (goal[key] !== null && typeof goal[key] !== 'undefined') {
          this[key] = goal[key];
        }
      });
    }
  }
}
