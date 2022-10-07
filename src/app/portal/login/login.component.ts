import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder, private authService: AuthService) {
    this.loginForm =  this.formBuilder.group({
      email: ['', Validators.pattern('.+@.+\..+')],
      password: ['']
    });
  }

  Login() {
    this.authService.Login( this.loginForm.get('email').value,
                            this.loginForm.get('password').value);
  }
}
