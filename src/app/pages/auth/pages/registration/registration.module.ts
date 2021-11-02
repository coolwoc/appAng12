import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationComponent } from './registration.component';

import { RegistrationRoutingModule } from './registration-routing.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormFieldModule, InputModule, PasswordModule } from '@src/src/app/shared/controls';
import { ButtonModule } from '@src/src/app/shared/buttons';


@NgModule({
  declarations: [RegistrationComponent],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormFieldModule,
    InputModule,
    PasswordModule,
    ButtonModule,
  ]
})

export class RegistrationModule { }