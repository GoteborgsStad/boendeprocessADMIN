import { Goal } from './goal.model';

export class GoalTemplate extends Goal {
  public id: number;

  public constructor(goalTemplate: GoalTemplate) {
    super(goalTemplate);
    if (goalTemplate) {
      Object.keys(goalTemplate).forEach((key: any, index: number) => {
        if (key === 'image') {
          this[key] = new Image(goalTemplate[key]);
        } else if (goalTemplate[key] !== null && typeof goalTemplate[key] !== 'undefined') {
          this[key] = goalTemplate[key];
        }
      });
    }
  }
}
