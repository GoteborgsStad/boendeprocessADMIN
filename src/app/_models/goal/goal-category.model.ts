export class GoalCategory {
  public id: number;
  public name: string;
  public description: string;
  public color: string;

  constructor(goalCat: GoalCategory) {
    if (goalCat) {
      Object.keys(goalCat).forEach((key: any, index: number) => {
        if (key === 'goalCat_category') {
          this[key] = new GoalCategory(goalCat[key]);
        } else if (goalCat[key] !== null && typeof goalCat[key] !== 'undefined') {
          this[key] = goalCat[key];
        }
      });
    }
  }
}
