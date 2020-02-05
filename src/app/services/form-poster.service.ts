import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Employee } from '../models/employee';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';

@Injectable({
  providedIn: 'root'
})
export class FormPosterService {

  constructor(private http: Http) { }

  postEmployeeForm(employee: Employee): Observable<any> {
    console.log('posting employee: ', employee);

    let body = JSON.stringify(employee);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post('http://localhost:3100/postemployee', body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getLanguages(): Observable<any> {
    return this.http.get('http://localhost:3100/get-languages')
      .delay(1000)
      .map(this.extractLanguages)
      .catch(this.handleError);
  }

  extractLanguages(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  extractData(res: Response) {
    let body = res.json();
    return body.fields || {};
  }

  handleError(err: any) {
    console.error('post error: ', err);
    return Observable.throw(err.statusText);
  }
}
