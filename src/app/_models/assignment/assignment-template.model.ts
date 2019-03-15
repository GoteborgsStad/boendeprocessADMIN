import { Assignment } from './assignment.model';

export class AssignmentTemplate extends Assignment {
  public id: number;

  public constructor(assignmentTemplate: AssignmentTemplate) {
    super(assignmentTemplate);
    if (assignmentTemplate) {
      Object.keys(assignmentTemplate).forEach((key: any, index: number) => {
        if (key === 'image') {
          this[key] = new Image(assignmentTemplate[key]);
        } else if (assignmentTemplate[key] !== null && typeof assignmentTemplate[key] !== 'undefined') {
          this[key] = assignmentTemplate[key];
        }
      });
    }
  }
}
