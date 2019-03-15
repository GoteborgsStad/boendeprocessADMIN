import { UserDetail } from './user-detail.model';

export class RegUser extends UserDetail {
  public personal_identity_number: string;
  public user_role_id: number;

  constructor(data?: UserDetail) {
    super(data);
    if (data) {
       Object.keys(data).forEach((key: any, index: number) => {
      if (data[key] !== null && typeof data[key] !== 'undefined') {
        this[key] = data[key];
      }
    });
    }
  }
}
