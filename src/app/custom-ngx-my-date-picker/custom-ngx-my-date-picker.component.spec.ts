import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { CustomNgxMyDatePickerComponent } from './custom-ngx-my-date-picker.component'

describe('CustomNgxMyDatePickerComponent', () => {
  let component: CustomNgxMyDatePickerComponent
  let fixture: ComponentFixture<CustomNgxMyDatePickerComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomNgxMyDatePickerComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomNgxMyDatePickerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
