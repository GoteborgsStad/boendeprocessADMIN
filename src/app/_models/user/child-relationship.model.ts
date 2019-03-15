import { Child } from './child.model';

export class ChildRelationShip {
    public id: number;
    public created_at: string;
    public updated_at: string;
    public child: Child;
    public parent: Child;

    constructor(data: ChildRelationShip) {
        Object.keys(data).forEach((key: any, index: number) => {
          if (data[key] !== null && typeof data[key] !== 'undefined') {
            // console.log("ContactPerson", newContact);
            this[key] = data[key];
          }
        });
      }
}
