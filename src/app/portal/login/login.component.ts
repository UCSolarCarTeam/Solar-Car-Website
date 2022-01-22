import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.loginForm =  this.formBuilder.group({
      email: ['', Validators.pattern('.+@.+\.com')],
      password: ['']
    });
  }

  ngOnInit(): void {
  }

  Login() {
    this.authService.Login( this.loginForm.get('email').value,
                            this.loginForm.get('password').value);
  }
}
