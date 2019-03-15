import { User } from '../user/user.model';
import { AssignmentCategory } from './assignment-category.model';
import { AssignmentForm } from './assignment-form.model';
import { AssignmentStatus } from './assignment-status.model';

export class Assignment {
  public id: number;
  public name: string;
  public description: string;
  public answer: string;
  public start_at: string;
  public end_at: string;
  public accepted_at: string;
  public finished_at: string;
  public image_description_url: string;
  public image_url: string;
  public color: string;
  public is_toggled: boolean;
  public user: User;
  public assignment_category: AssignmentCategory;
  public assignment_form: AssignmentForm[];
  public assignment_status: AssignmentStatus;
  public created_at: string;
  public updated_at: string;

  public constructor(goal?: Assignment) {
    if (goal) {
      Object.keys(goal).forEach((key: any, index: number) => {
        if (key === 'goal_category') {
          this[key] = new AssignmentCategory(goal[key]);
        } else if (goal[key] !== null && typeof goal[key] !== 'undefined') {
          this[key] = goal[key];
        }
      });
    }
  }
}
