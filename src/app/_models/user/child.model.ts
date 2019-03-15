import { UserDetail } from './user-detail.model';

export class Child {
  public id: number;
  public personal_identity_number: string;
  public created_at: string;
  public updated_at: string;
  public user_detail: UserDetail;

  constructor(data: Child) {
    Object.keys(data).forEach((key: any, index: number) => {
      if (data[key] !== null && typeof data[key] !== 'undefined') {
        // console.log("ContactPerson", newContact);
        this[key] = data[key];
      }
    });
  }
}
