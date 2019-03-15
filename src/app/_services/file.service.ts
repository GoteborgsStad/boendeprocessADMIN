import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class FileService {

  constructor(
    private apiService: ApiService,
  ) { }

  public base64Image(value: object) {
    return this.apiService.API('POST', '/v1/files/images/base64', value);
  }
}
