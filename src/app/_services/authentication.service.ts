import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

@Injectable()
export class AuthenticationService {

  constructor(
    private apiService: ApiService,
  ) { }

  public login(value: object) {
    return this.apiService.API('POST', '/v1/auth/login', value);
  }

  public logout() {
    return this.apiService.API('GET', '/v1/auth/logout');
  }
}
