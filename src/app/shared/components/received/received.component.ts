import { Component, OnInit } from '@angular/core';
import { Received } from '../../models/received';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReceivedService } from './../../../core/services/received.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-received',
  templateUrl: './received.component.html',
  styleUrls: ['./received.component.scss']
})
export class ReceivedComponent implements OnInit {
  receiveds: Received[] = []
  editMode: boolean = false
  id: any = null
  p: number = 1
  total: any = 0

  constructor(private _ReceivedService: ReceivedService, private _ToastrService: ToastrService) { }

  receivedForm = new FormGroup({
    amount: new FormControl('', Validators.required),
    comefrom: new FormControl('', Validators.required),
    desc: new FormControl('', Validators.required)
  })

  get receivedFormValidate() {
    return this.receivedForm.controls
  }

  ngOnInit(): void {
    this.getReceiveds()
  }

  getReceiveds() {
    this._ReceivedService.receiveds().subscribe(allReceived => {
      this.receiveds = allReceived.data
    }, (error) => {
      this._ToastrService.error(error.error.message)
    }, () => { })
  }

  pageChanged(num: any) {
    this.p = num
    this.getReceiveds()
  }

  getReceived(id: any) {
    this._ReceivedService.received(id).subscribe(singleReceived => {
      this.id = singleReceived.data._id
      this.receivedForm.patchValue({
        amount: singleReceived.data.amount,
        comefrom: singleReceived.data.comefrom,
        desc: singleReceived.data.desc
      })
    }, (error) => {
      this._ToastrService.error(error.error.message)
    }, () => { })
    this.editMode = true
  }

  addReceived() {
    this._ReceivedService.addReceived(this.receivedForm.value).subscribe(addReceived => {

      this._ToastrService.success('💛 تم الإضافة ')

      this.receivedForm.reset()
      this.getReceiveds()
    }, (error) => {
      this._ToastrService.error(error.error.message)
    }, () => { })
  }

  deleteReceived(id: any) {
    this._ReceivedService.deleteReceived(id).subscribe(deleteReceived => {

      this._ToastrService.error('💛 تم المسح ')

      this.getReceiveds()
    }, (error) => {
      this._ToastrService.error(error.error.message)
    }, () => { })
  }

  updateReceived() {
    this._ReceivedService.updateReceived(this.receivedForm.value, this.id).subscribe(updateReceived => {

      this._ToastrService.info('💛 تم التعديل ')

      this.receivedForm.reset()
      this.getReceiveds()
    }, (error) => {
      this._ToastrService.error(error.error.message)
    }, () => { })
    this.editMode = false
  }
  clearData() {
    this.editMode = false
    this.receivedForm.reset()
  }

}
