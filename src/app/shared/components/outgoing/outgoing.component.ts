import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Outgoing } from './../../models/outgoing';
import { OutgoingService } from './../../../core/services/outgoing.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-outgoing',
  templateUrl: './outgoing.component.html',
  styleUrls: ['./outgoing.component.scss']
})
export class OutgoingComponent implements OnInit {
  outgoings: Outgoing[] = []
  editMode: boolean = false
  id: any = null
  p: number = 1;
  total: any = 0

  constructor(private _OutgoingService: OutgoingService, private _ToastrService: ToastrService) { }

  outgoingForm = new FormGroup({
    amount: new FormControl('', Validators.required),
    outto: new FormControl('', Validators.required),
    desc: new FormControl('')
  })

  get outgoingFormValidate() {
    return this.outgoingForm.controls
  }

  ngOnInit(): void {
    this.getOutgoings()
  }

  getOutgoings() {
    this._OutgoingService.outgoings().subscribe(allOutgoing => {
      this.outgoings = allOutgoing.data
      this.total = allOutgoing.length
    }, (error) => {
      this._ToastrService.error(error.error.message)
    }, () => { })
  }

  pageChanged(num: any) {
    this.p = num
    this.getOutgoings()
  }
  getOutgoing(id: any) {
    this._OutgoingService.outgoing(id).subscribe(singleOutgoing => {
      this.id = singleOutgoing.data._id
      this.outgoingForm.patchValue({
        amount: singleOutgoing.data.amount,
        outto: singleOutgoing.data.outto,
        desc: singleOutgoing.data.desc
      })
    }, (error) => {
      this._ToastrService.error(error.error.message)
    }, () => { })
    this.editMode = true
  }

  addOutgoing() {
    this._OutgoingService.addOutgoing(this.outgoingForm.value).subscribe(addOutgoing => {

      this._ToastrService.success('💛 تم الإضافة ')

      this.outgoingForm.reset()
      this.getOutgoings()
    }, (error) => {
      this._ToastrService.error(error.error.message)
    }, () => { })
  }

  deleteOutgoing(id: any) {
    this._OutgoingService.deleteOutgoing(id).subscribe(deleteOutgoing => {

      this._ToastrService.error('💛 تم المسح ')

      this.getOutgoings()
    }, (error) => {
      this._ToastrService.error(error.error.message)
    }, () => { })
  }

  updateOutgoing() {
    this._OutgoingService.updateOutgoing(this.outgoingForm.value, this.id).subscribe(updateOutgoing => {

      this._ToastrService.info('💛 تم التعديل ')

      this.outgoingForm.reset()
      this.getOutgoings()
    }, (error) => {
      this._ToastrService.error(error.error.message)
    }, () => { })
    this.editMode = false
  }
  clearData() {
    this.editMode = false
    this.outgoingForm.reset()
  }

}
