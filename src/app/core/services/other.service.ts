import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Other } from './../../shared/models/other';

@Injectable({
  providedIn: 'root'
})
export class OtherService {

  otherApi = "http://localhost:3000/api/other/"

  constructor(private _HttpClient: HttpClient) { }

  others(): Observable<any> {
    return this._HttpClient.get(this.otherApi + "others")
  }
  other(id: any): Observable<any> {
    return this._HttpClient.get(this.otherApi + `other/${id}`)
  }
  addOther(other: Other): Observable<any> {
    return this._HttpClient.post(this.otherApi + "addOther", other)
  }
  deleteOther(id: any): Observable<any> {
    return this._HttpClient.delete(this.otherApi + `deleteOther/${id}`)
  }
  updateOther(other: Other, id: any) {
    return this._HttpClient.put(this.otherApi + `updateOther/${id}`, other)
  }

}
