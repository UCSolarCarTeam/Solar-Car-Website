import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  resetForm: UntypedFormGroup;

  constructor(private authService: AuthService, private formBuilder: UntypedFormBuilder) {
    this.resetForm =  this.formBuilder.group({
      email: ['', Validators.pattern('.+@.+\.com')]
    });
  }

  resetPasswordSubmit() {
    this.authService.ResetPassword(this.resetForm.get('email').value);
  }
}
