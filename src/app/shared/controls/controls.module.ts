import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonsModule } from '../buttons/buttons.module';
import { InputModule } from './input/input.module';
import { FormFieldModule } from './form-field/form-field.module';
import { PasswordModule } from './password/password.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonsModule,
    InputModule,
    FormFieldModule,
    PasswordModule,
  ],
  exports: [
    CommonModule,
    ButtonsModule,
    InputModule,
    FormFieldModule,
    PasswordModule,
  ]
})
export class ControlsModule { }