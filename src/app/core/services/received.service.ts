import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Received } from './../../shared/models/received';

@Injectable({
  providedIn: 'root'
})
export class ReceivedService {

  receivedApi = "http://localhost:3000/api/received/"

  constructor(private _HttpClient: HttpClient) { }

  receiveds(): Observable<any> {
    return this._HttpClient.get(this.receivedApi + "receiveds")
  }
  received(id: any): Observable<any> {
    return this._HttpClient.get(this.receivedApi + `received/${id}`)
  }
  addReceived(received: Received): Observable<any> {
    return this._HttpClient.post(this.receivedApi + "addReceived", received)
  }
  deleteReceived(id: any): Observable<any> {
    return this._HttpClient.delete(this.receivedApi + `deleteReceived/${id}`)
  }
  updateReceived(received: Received, id: any) {
    return this._HttpClient.put(this.receivedApi + `updateReceived/${id}`, received)
  }

}
