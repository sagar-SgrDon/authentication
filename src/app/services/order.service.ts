import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable()
export class OrderService {
  constructor(private http: HttpClient) {}

  getOrders() {
    let token = localStorage.getItem('token');
    const options = {
      headers: new HttpHeaders().append('Authorization', 'Bearer ' + token),
      params: new HttpParams().append('key', 'value'),
    };
    console.log(options);

    return this.http.get('/api/orders', options).pipe(map((res) => res));
  }
}
