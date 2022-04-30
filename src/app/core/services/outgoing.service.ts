import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Outgoing } from './../../shared/models/outgoing';

@Injectable({
  providedIn: 'root'
})
export class OutgoingService {

  outgoingApi = "http://localhost:3000/api/outgoing/"

  constructor(private _HttpClient: HttpClient) { }

  outgoings(): Observable<any> {
    return this._HttpClient.get(this.outgoingApi + "outgoings")
  }
  outgoing(id: any): Observable<any> {
    return this._HttpClient.get(this.outgoingApi + `outgoing/${id}`)
  }
  addOutgoing(outgoing: Outgoing): Observable<any> {
    return this._HttpClient.post(this.outgoingApi + "addOutgoing", outgoing)
  }
  deleteOutgoing(id: any): Observable<any> {
    return this._HttpClient.delete(this.outgoingApi + `deleteOutgoing/${id}`)
  }
  updateOutgoing(outgoing: Outgoing, id: any) {
    return this._HttpClient.put(this.outgoingApi + `updateOutgoing/${id}`, outgoing)
  }

}
