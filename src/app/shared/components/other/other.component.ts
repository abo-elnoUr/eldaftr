import { Component, OnInit } from '@angular/core';
import { Other } from '../../models/other';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OtherService } from 'src/app/core/services/other.service';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.scss']
})
export class OtherComponent implements OnInit {
  others: Other[] = []
  editMode: boolean = false
  id: any = null
  p: number = 1
  total: any = 0

  constructor(private _OtherService: OtherService, private _ToastrService: ToastrService) { }

  otherForm = new FormGroup({
    amount: new FormControl('', Validators.required),
    reason: new FormControl('')
  })

  get otherFormValidate() {
    return this.otherForm.controls
  }

  ngOnInit(): void {
    this.getOthers()
  }

  getOthers() {
    this._OtherService.others().subscribe(allOther => {
      this.others = allOther.data
    }, (error) => {
      this._ToastrService.error(error.error.message)
    }, () => { })
  }

  pageChanged(num: any) {
    this.p = num
    this.getOthers()
  }

  getOther(id: any) {
    this._OtherService.other(id).subscribe(singleOther => {
      console.log(singleOther);

      this.id = singleOther.data._id
      this.otherForm.patchValue({
        amount: singleOther.data.amount,
        reason: singleOther.data.reason
      })
    }, (error) => {
      this._ToastrService.error(error.error.message)
    }, () => { })
    this.editMode = true
  }

  addOther() {
    this._OtherService.addOther(this.otherForm.value).subscribe(addOther => {

      this._ToastrService.success('💛 تم الإضافة ')

      this.otherForm.reset()
      this.getOthers()
    }, (error) => {
      this._ToastrService.error(error.error.message)
    }, () => { })
  }

  deleteOther(id: any) {
    this._OtherService.deleteOther(id).subscribe(deleteOther => {

      this._ToastrService.error('💛 تم المسح ')

      this.getOthers()
    }, (error) => {
      this._ToastrService.error(error.error.message)
    }, () => { })
  }

  updateOther() {
    this._OtherService.updateOther(this.otherForm.value, this.id).subscribe(updateOther => {

      this._ToastrService.info('💛 تم التعديل ')

      this.otherForm.reset()
      this.getOthers()
    }, (error) => {
      this._ToastrService.error(error.error.message)
    }, () => { })
    this.editMode = false
  }
  clearData() {
    this.editMode = false
    this.otherForm.reset()
  }


}
