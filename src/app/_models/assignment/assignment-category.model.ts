export class AssignmentCategory {
  public id: number;
  public name: string;
  public description: string;
  public color: string;
  public created_at: string;
  public updated_at: string;

  public constructor(goal?: AssignmentCategory) {
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
