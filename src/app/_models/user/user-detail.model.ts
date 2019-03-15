export class UserDetail {
  public id: number;
  public first_name: string;
  public last_name: string;
  public full_name: string;
  public display_name: string;
  public email: string;
  public sex: number;
  public description: string;
  public street_address: string;
  public zip_code: string;
  public city: string;
  public home_phone_number: string;
  public cell_phone_number: string;
  public image_url: string;
  public image_name: string;
  public color: string;
  public user_id: number;
  public created_at: string;
  public updated_at: string;

  constructor(data: UserDetail) {
    Object.keys(data).forEach((key: any, index: number) => {
      if (data[key] !== null && typeof data[key] !== 'undefined') {
        // console.log("ContactPerson", newContact);
        this[key] = data[key];
      }
    });
  }

  public getFullName() {
    return this.first_name + ' ' + this.last_name;
  }
}
