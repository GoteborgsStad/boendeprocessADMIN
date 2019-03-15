import { Evaluation } from '../evaluation/evaluation.model';
import { Plan } from '../plan/plan.model';
import { Assignment } from './../assignment/assignment.model';
import { Operand } from './../operand.model';
import { ChildRelationShip } from './child-relationship.model';
import { GlobalStatus } from './global-status.model';
import { UserConfiguration } from './user-configuration.model';
import { UserDetail } from './user-detail.model';
import { UserRelationship } from './user-relationship.model';
import { UserRole } from './user-role.model';

export class User {
  public assignments: Assignment[];
  public plan: Plan;
  public id: number;
  public personal_identity_number: string;
  public amount_of_contacts: number;
  public amount_of_adolescents: number;
  public created_at: string;
  public updated_at: string;
  public operands: Operand[];
  public user_configurations: UserConfiguration[];
  public user_detail: UserDetail;
  public user_relationships: UserRelationship[];
  public user_role: UserRole;
  public child_relationships: ChildRelationShip[];
  public parent_relationships: ChildRelationShip[];
  public global_status: GlobalStatus;
  public highest_goal_status: any = null;
  public highest_assignment_status: any = null;
  public is_me: boolean;
  public selected: boolean;
  public evaluations: Evaluation[];

  constructor(data: User) {
    Object.keys(data).forEach((key: any, index: number) => {
      if (data[key] !== null && typeof data[key] !== 'undefined') {
        if (key === 'user_detail') {
          this[key] = new UserDetail(data[key]);
        } else {
          if (data[key]) {
            this[key] = data[key];
          }
        }
      }
    });
  }
}
