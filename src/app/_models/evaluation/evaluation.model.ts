import { User } from '../user/user.model';
import { EvaluationAnswer } from './evaluation-answer.model';
import { EvaluationGoal } from './evaluation-goal.model';
import { EvaluationStatus } from './evaluation-status.model';

export class Evaluation {
  public id: number;
  public name: string;
  public description: string;
  public color: string;
  public is_toggled: boolean;
  public user: User;
  public evaluation_status: EvaluationStatus;
  public evaluation_answers: EvaluationAnswer[];
  public evaluation_goals: EvaluationGoal[];
  public created_at: string;
  public updated_at: string;
}
