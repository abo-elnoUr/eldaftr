import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  id: any = null
  token = localStorage.getItem('token')
  userImage = localStorage.getItem('userImage') || ''
  profileimage: any = ''

  constructor(public _UserService: UserService, private _Router: Router) {
    if (this.token) {
      _UserService.isLogin = true
    } else {
      _UserService.isLogin = false
    }
    this._UserService.userImg = this.userImage
  }

  ngOnInit(): void {
    this.id = localStorage.getItem('userId')
    this._UserService.user(this.id).subscribe(user => {
      this.profileimage = user.data.profileimage
    })
    this.profileimage = this.userImage
  }

  logout() {
    this._UserService.logout().subscribe(logout => {
      this._UserService.isLogin = false
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('userImage')
      this._Router.navigate(['login'])
    })
  }

}
