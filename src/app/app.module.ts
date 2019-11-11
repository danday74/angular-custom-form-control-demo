import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AppComponent } from './app.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CustomNgxMyDatePickerComponent } from './custom-ngx-my-date-picker/custom-ngx-my-date-picker.component'
import { NgxMyDatePickerModule } from 'ngx-mydatepicker'

@NgModule({
  declarations: [
    AppComponent,
    CustomNgxMyDatePickerComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMyDatePickerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {}
