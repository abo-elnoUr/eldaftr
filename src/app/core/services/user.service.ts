import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './../../shared/models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userApi = "http://localhost:3000/api/users/"
  isLogin: boolean = false
  publicPath = "http://localhost:3000/"
  public userImg: any

  constructor(private _HttpClient: HttpClient) { }

  register(userData: User): Observable<any> {
    return this._HttpClient.post(this.userApi + "register", userData)
  }
  login(userData: User): Observable<any> {
    return this._HttpClient.post(this.userApi + "login", userData)
  }
  users(): Observable<any> {
    return this._HttpClient.get(this.userApi + "users")
  }
  user(id: any): Observable<any> {
    return this._HttpClient.get(this.userApi + `user/${id}`)
  }
  uploadImage(userImage: any): Observable<any> {
    return this._HttpClient.post(this.userApi + "uploadImage", userImage)
  }
  logout(): Observable<any> {
    return this._HttpClient.get(this.userApi + "logout")
  }
  updateUser(userData: User, id: any): Observable<any> {
    return this._HttpClient.put(this.userApi + `updateUser/${id}`, userData)
  }
  deleteUser(id: any): Observable<any> {
    return this._HttpClient.delete(this.userApi + `deleteUser/${id}`)
  }
}
