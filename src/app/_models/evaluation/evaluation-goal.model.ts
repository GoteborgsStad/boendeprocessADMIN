import { Goal } from '../goal/goal.model';
import { Evaluation } from './evaluation.model';

export class EvaluationGoal {
  public id: number;
  public goal: Goal;
  public evaluation: Evaluation;
  public created_at: string;
  public updated_at: string;
}
