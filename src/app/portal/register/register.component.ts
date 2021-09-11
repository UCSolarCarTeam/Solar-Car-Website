import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.signUpForm = this.formBuilder.group({
      email: [''],
      password: ['']
    })
  }

  ngOnInit(): void {
  }

  SignUp() {
    this.authService.SignUp(this.signUpForm.get('email').value,
                            this.signUpForm.get('password').value);
  }

}
