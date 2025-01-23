import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserForLogin } from '../../model/user';
import { AlertifyService } from '../../services/alertify.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class UserLoginComponent implements OnInit {
  loginForm: FormGroup;
  user: UserForLogin;
  constructor(
    private fb: FormBuilder, // Inject FormBuilder
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]], // Add username control
      password: ['', [Validators.required, Validators.minLength(6)]], // Add password control
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form Submitted:', this.loginForm.value);
      const token = this.authService.authUser(this.loginForm.value);
      if (token) {
        localStorage.setItem('token', token.userName);
        console.log('Login successful');
        this.alertify.success('Login successful');
        this.router.navigate(['/']); // Redirect to home or another route
      } else {
        console.log('Login unsuccessful');
        this.alertify.error('Invalid username or password');
      }
    } else {
      console.log('Form is invalid');
    }
  }
}
