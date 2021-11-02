import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { markFormGroupTouched, regex, regexErrors } from '@src/src/app/shared/utils';

import { NotificationService } from '@src/src/app/services';
import { AuthService } from '../../services/auth.service';

import Validation from '@src/src/app/shared/utils/valdation';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent implements OnInit {

  form!: FormGroup;
  regexErrors = regexErrors;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notification: NotificationService) {
      this.authService.isRegisters();
    }

  ngOnInit(): void {

  this.form = this.fb.group({
    name: [null, {
      updateOn: 'blur', validators: [
        Validators.required,
      ]
    }],
    surname: [null, {
      updateOn: 'blur', validators: [
        Validators.required,
      ]
    }],
    email: [null, {
      updateOn: 'blur', validators: [
        Validators.required,
        Validators.maxLength(128),
        Validators.pattern(regex.email)
      ]
    }],
    password: [null, {
      updateOn: 'blur', validators: [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
        Validators.pattern(regex.password)
      ]
    }],
    confirmPassword: [null, {
        updateOn: 'blur', validators: [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
          Validators.pattern(regex.password)
        ]
    }]
    }, { validators: [Validation.match('password', 'confirmPassword')] })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    const { name, surname, email, password } = this.form.value;
    if(this.form.valid) {
      this.authService.registerUser(name, surname, email, password).subscribe(
        data => {
          this.notification.success('New User has been added to DB');
          this.authService.registerUserSuccessfully();
        },
        err => {
          this.notification.error(err.message);
        }
      )
    } else {
      markFormGroupTouched(this.form);
    }
  }
}
