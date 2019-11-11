import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { INgxMyDpOptions } from 'ngx-mydatepicker'
import * as moment from 'moment'
import { momentToYearMonthDay } from './utils/date-utils'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  get myName() { return this.myForm.get('myName') }

  get myDate() { return this.myForm.get('myDate') }

  datePickerOptions: INgxMyDpOptions
  myForm: FormGroup // reactive
  myForm2Data: any // template driven

  myNameDisabled = false
  myDateDisabled = false

  ngOnInit() {
    const myDateStr = '2019-11-01T00:00:00+01:00'
    this.myForm = new FormGroup({
      myName: new FormControl({value: 'fred', disabled: this.myNameDisabled}, Validators.required),
      myDate: new FormControl({value: myDateStr, disabled: this.myDateDisabled}, Validators.required)
    })
    this.myForm2Data = {
      myName2: 'bob',
      myDate2: myDateStr
    }
    const momentUntil = moment().subtract(1, 'month')
    const momentSince = moment().add(1, 'month')
    this.datePickerOptions = {
      disableUntil: momentToYearMonthDay(momentUntil),
      disableSince: momentToYearMonthDay(momentSince)
    }
  }

  disableNames() {
    this.myNameDisabled = !this.myNameDisabled
    if (this.myNameDisabled) {
      this.myName.disable()
    } else {
      this.myName.enable()
    }
  }

  disableDates() {
    this.myDateDisabled = !this.myDateDisabled
    if (this.myDateDisabled) {
      this.myDate.disable()
    } else {
      this.myDate.enable()
    }
  }
}
