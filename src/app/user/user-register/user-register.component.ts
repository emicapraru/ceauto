import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

import { UserForRegister } from '../../model/user';
import { AlertifyService } from '../../services/alertify.service';
import { AuthService } from '../../services//auth.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class UserRegisterComponent implements OnInit {
  registerationForm: FormGroup;
  user: UserForRegister;
  userSubmitted: boolean;
  userService: AuthService;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.createRegisterationForm();
  }

  createRegisterationForm() {
    this.registerationForm = this.fb.group(
      {
        userName: ['Default Value', Validators.required],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(8)]],
        confirmPassword: [null, Validators.required],
        mobile: [
          null,
          [Validators.required, Validators.pattern('^[0-9]{10}$')],
        ],
      },
      { validators: this.passwordMatchingValidation }
    );
  }

  passwordMatchingValidation(fg: FormGroup): ValidationErrors | null {
    const passwordControl = fg.get('password');
    const confirmPasswordControl = fg.get('confirmPassword');

    if (!passwordControl || !confirmPasswordControl) {
      return null; // If either control is missing, consider the validation as passed
    }

    const password = passwordControl.value;
    const confirmPassword = confirmPasswordControl.value;

    return password === confirmPassword ? null : { notmatched: true };
  }
  userData(): UserForRegister {
    return (this.user = {
      userName: this.userName.value,
      email: this.email.value,
      password: this.password.value,
      mobile: this.mobile.value,
    });
  }
  // ------------------------------------
  // Getter methods for all form controls
  // ------------------------------------
  get userName() {
    return this.registerationForm.get('userName') as FormControl;
  }

  get email() {
    return this.registerationForm.get('email') as FormControl;
  }
  get password() {
    return this.registerationForm.get('password') as FormControl;
  }
  get confirmPassword() {
    return this.registerationForm.get('confirmPassword') as FormControl;
  }
  get mobile() {
    return this.registerationForm.get('mobile') as FormControl;
  }

  onSubmit() {
    console.log(this.registerationForm.value);
    this.userSubmitted = true;
    if (this.registerationForm.valid) {
      // this.user = Object.assign(this.user, this.registerationForm.value);
      this.addUser(this.userData());
      //this.userService.addUser(this.userData());
      this.registerationForm.reset();
      this.userSubmitted = false;
      this.alertify.success('Congrats');
    } else {
      this.alertify.success('Failed');
    }
  }

  addUser(user: UserForRegister) {
    let users = [];
    if (localStorage.getItem('Users')) {
      users = JSON.parse(localStorage.getItem('Users') || '{}');
      users = [user, ...users];
    } else {
      users = [user];
    }
  }
  onReset() {
    this.userSubmitted = false;
    this.registerationForm.reset();
  }
}
