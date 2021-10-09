import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signUpForm: FormGroup;
  passwordsDoNotMatch: boolean;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.signUpForm = this.formBuilder.group({
      displayName: [''],
      email: ['', Validators.pattern('.+@.+\.com')],
      password: ['', Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')],
      passwordConfirm: [''],
    })
  }

  ngOnInit(): void {
  }

  SignUp() {
    if (this.signUpForm.get('password').value !== this.signUpForm.get('passwordConfirm').value) {
      this.passwordsDoNotMatch = true;
      return;
    }
    this.passwordsDoNotMatch = false;
    this.authService.SignUp(this.signUpForm.get('displayName').value,
                            this.signUpForm.get('email').value,
                            this.signUpForm.get('password').value);
  }

  SignUpSuccess() {
    return this.authService.user !== null && !this.authService.user.verified;
  }
}
