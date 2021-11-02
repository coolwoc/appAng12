import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '@src/src/app/services';
import { regex, regexErrors } from '@src/src/app/shared/utils';

import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  regexErrors = regexErrors;
  errorMessage = '';


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notification: NotificationService
  ) { 
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, {
        updateOn: 'blur', validators: [
          Validators.required,
          Validators.pattern(regex.email)
        ]
      }],
      password: [null, {
        updateOn: 'change', validators: [
          Validators.required
        ]
      }]
    })
  }

  onSubmit(): void {
    const { email, password } = this.form.value;
    
    if (this.form.valid) {
      this.authService.login(email, password).subscribe(
        data => {
          this.authService.saveToken(data.accessToken);
          this.notification.success('Welcome to HiberusApp');
          this.authService.authSuccessfully();
        },
        err => {
          this.notification.error(err.message);
        }
      )
    }
  }
}
