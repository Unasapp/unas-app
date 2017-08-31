import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ReportServiceService {

  constructor(private http:Http) { }

  testPoint() {
    return this.http.get('/api/test')
      .map(res => res.json());
  }

}
