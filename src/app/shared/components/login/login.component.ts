import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { UserService } from 'src/app/core/services/user.service'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  token = localStorage.getItem('token')

  constructor(private _UserService: UserService, private _ToastrService: ToastrService, private _Router: Router) {
    if (this.token) {
      this._Router.navigate([''])
    }
  }

  ngOnInit(): void {

  }

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })

  get loginFormValidate() {
    return this.loginForm.controls
  }
  onLogin() {
    this._UserService.login(this.loginForm.value).subscribe(login => {
      this._ToastrService.success('💛 تم تسجيل الدخول بنجاح')
      this._UserService.isLogin = true
      localStorage.setItem('token', login.data.token)
      localStorage.setItem('userId', login.data.userLogin._id)
      this._Router.navigate(['outgoing'])
      this.loginForm.reset()
    }, (error) => {
      console.log(error);
      this._ToastrService.error(error.error.message)
      this.loginForm.reset()
    }, () => { })
  }
}
