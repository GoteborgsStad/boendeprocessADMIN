export class Jwt {
  public role: string;
  public iss: string;
  public sub: number;
  public iat: number;
  public exp: number;

  constructor(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const data = JSON.parse(window.atob(base64));

    Object.keys(data).forEach((key: any, index: number) => {
      if (data[key] !== null && typeof data[key] !== 'undefined') {
        this[key] = data[key];
      }
    });
  }

  public getTokenExpirationDate() {
    return this.exp;
  }
}
