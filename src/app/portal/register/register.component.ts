import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signUpForm: UntypedFormGroup;
  passwordsDoNotMatch: boolean;
  ucalgaryEmailUsed = true;

  constructor(private formBuilder: UntypedFormBuilder, private authService: AuthService) {
    this.signUpForm = this.formBuilder.group({
      displayName: [''],
      email: ['', Validators.pattern('.+@.+\.c.+')],
      password: ['', Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!#%*?&])[A-Za-z\d$@$!%*?&].{8,}')],
      passwordConfirm: [''],
    });
  }

  ngOnInit(): void {
  }

  SignUp() {
    if (this.signUpForm.get('password').value !== this.signUpForm.get('passwordConfirm').value) {
      this.passwordsDoNotMatch = true;
      return;
    }
    if (!this.signUpForm.get('email').value.includes('ucalgary.ca')) {
      this.ucalgaryEmailUsed = false;
      return;
    }
    this.passwordsDoNotMatch = false;
    this.authService.SignUp(this.signUpForm.get('displayName').value,
                            this.signUpForm.get('email').value,
                            this.signUpForm.get('password').value);
  }

  SignUpSuccess() {
    const user = JSON.parse(window.sessionStorage.getItem('User'));
    return user !== null && !user.verified;
  }
}
