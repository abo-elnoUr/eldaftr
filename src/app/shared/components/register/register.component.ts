import { Component, OnInit } from '@angular/core';
import { UserService } from './../../../core/services/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private _UserService: UserService, private _Router: Router, private _ToastrService: ToastrService) { }

  ngOnInit(): void {
  }

  registerForm = new FormGroup({
    fname: new FormControl('', Validators.required),
    lname: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    phone: new FormControl('', [Validators.required, Validators.minLength(11)]),
  });

  get registerFormValidate() {
    return this.registerForm.controls
  }

  onRegister() {
    this._UserService.register(this.registerForm.value).subscribe(register => {
      this._ToastrService.success(`💛 ${this.registerForm.value.username} تم تسجيل`)
      this._Router.navigate(['login'])
      this.registerForm.reset()
    }, (error) => {
      if (error.error.data.username) {
        this._ToastrService.error(error.error.data.username)
      } else {
        this._ToastrService.error(error.error.message)
      }
    }, () => { })
  }
}
