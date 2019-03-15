import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/repeatWhen';
import 'rxjs/add/operator/retry';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  public API(method: string, path: string, payload: object = {}) {

  const uri: string = path;

  const options: any = {
    body: JSON.stringify(payload),
  };
  return this.http.request(method, uri, options)
    .retry(0)
    .map((res: any) => res);
  }
}
