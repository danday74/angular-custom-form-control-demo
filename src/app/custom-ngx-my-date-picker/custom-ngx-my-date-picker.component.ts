import { Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { INgxMyDpOptions } from 'ngx-mydatepicker'
import { merge } from 'lodash'
import * as moment from 'moment'
import { momentToYearMonthDay } from '../utils/date-utils'

@Component({
  selector: 'app-custom-my-date-picker',
  templateUrl: './custom-ngx-my-date-picker.component.html',
  styleUrls: ['./custom-ngx-my-date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomNgxMyDatePickerComponent),
      multi: true
    }
  ]
})

export class CustomNgxMyDatePickerComponent implements OnInit, OnChanges, ControlValueAccessor {

  @Input() options: INgxMyDpOptions = {}
  disabled = false
  inputValue: any
  prevOutputValue: any

  ngOnInit() {
    this.mergeOptions(this.options)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.options && !changes.options.firstChange) {
      this.mergeOptions(changes.options.currentValue)
    }
  }

  private mergeOptions(options) {
    const defaultOptions: INgxMyDpOptions = {
      dateFormat: 'dd/mm/yyyy', // datepicker date format
      satHighlight: true
    }
    this.options = merge({}, defaultOptions, options)
  }

  // ***** INPUT *****
  // Called by the system with the form control value
  writeValue(inputValue) {
    if (inputValue != null) {
      // Add 1 hour fixes clock change bug
      const myMoment = moment(inputValue).add(1, 'hour').startOf('day')
      this.inputValue = {
        date: momentToYearMonthDay(myMoment),
        jsdate: myMoment.toDate(),
        formatted: myMoment.format('DD/MM/YYYY'), // moment date format
        epoc: myMoment.unix()
      }
      if (typeof this.prevOutputValue === 'undefined') this.prevOutputValue = myMoment.format()
    } else {
      this.inputValue = null
    }
  }

  // ***** OUTPUT *****
  // Register onChange function
  registerOnChange(fn: (outputValue) => void) {
    this.onChange = fn
  }

  // Call this to modify output value
  onBeforeChange = (rawOutputValue) => {
    let outputValue
    if (rawOutputValue) {
      const myMoment = moment(rawOutputValue.jsdate)
      outputValue = myMoment.format()
    } else {
      outputValue = null
    }
    // Only call onChange if there has been a change else the custom control will be wrongly identified as dirty
    if (outputValue !== this.prevOutputValue) {
      this.prevOutputValue = outputValue
      this.onChange(outputValue)
    }
  }

  // Call this to output value
  // noinspection JSUnusedLocalSymbols
  onChange = (outputValue) => {}

  // ***** TOUCHED *****
  // Register onTouched function
  registerOnTouched(fn: () => void) {
    this.onTouched = fn
  }

  // Call this to make the form control touched
  onTouched = () => {}

  // ***** DISABLED *****
  // Called by the system with the disabled state
  setDisabledState(disabled: boolean) {
    this.disabled = disabled
  }
}
