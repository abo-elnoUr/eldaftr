import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  username: any = ''
  fname: any = ''
  lname: any = ''
  file: any = null
  profileimage: string = ''
  fileImage: any = ""
  id: any = null

  constructor(public _UserService: UserService, private _ToastrService: ToastrService, private _Router: Router) { }

  profileForm = new FormGroup({
    fname: new FormControl('', Validators.required),
    lname: new FormControl('', Validators.required),
    username: new FormControl(''),
    phone: new FormControl(''),
  });


  ngOnInit(): void {
    this.id = localStorage.getItem('userId')
    this.currentUser()
  }
  onChangeImg(event: any) {
    this.file = event.target.files
  }

  uploadImage(imgForm: NgForm) {
    if (this.file != null) {
      let formData = new FormData()
      formData.append('profile', this.file[0])
      this._UserService.uploadImage(formData).subscribe((img) => {

        this._ToastrService.success('💛 تم تحميل الصورة ')

        this.fileImage = ""
        this.id = localStorage.getItem('userId')

        this.currentUser()
        imgForm.resetForm()
      })
    }
  }

  deleteUser() {
    let choice = prompt("هل تريد حذف الحساب؟", 'confirm')
    if (choice == 'confirm') {
      this._UserService.deleteUser(this.id).subscribe(deleteUser => {
        this._ToastrService.info('💛 تم حذف الحساب ')
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        this._Router.navigate(['register'])
      }, (error) => { this._ToastrService.error(error.error.message) }, () => { })
    } else {
      this._ToastrService.info('💛 لم يتم حذف الحساب ')
    }

  }

  updateUser() {
    if (this.profileForm.controls['username'].dirty) {
      this.updateUserLogic()
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      this._Router.navigate(['login'])
    } else {
      this.updateUserLogic()
    }
  }

  updateUserLogic() {
    this._UserService.updateUser(this.profileForm.value, this.id).subscribe(user => {
      this._ToastrService.info('💛  تم التعديل ')
      this.id = localStorage.getItem('userId')
      this._UserService.user(this.id).subscribe(user => {
        this.username = user.data.username
        this.profileimage = user.data.profileimage
        localStorage.setItem("userImage", user.data.profileimage)

        this.profileForm.patchValue({
          fname: user.data.fname,
          lname: user.data.lname,
          username: user.data.username,
          phone: user.data.phone,
        })
      })
    })
  }

  currentUser() {
    this._UserService.user(this.id).subscribe(user => {
      this.username = user.data.username
      this.fname = user.data.fname
      this.lname = user.data.lname
      this.profileimage = user.data.profileimage
      localStorage.setItem("userImage", user.data.profileimage)
      this._UserService.userImg = user.data.profileimage
      this.profileForm.patchValue({
        fname: user.data.fname,
        lname: user.data.lname,
        username: user.data.username,
        phone: user.data.phone,
      })
    })
  }

}
