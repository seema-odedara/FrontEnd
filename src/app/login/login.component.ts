import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { ApiCallsService } from '../api-calls.service';
import { HttpClient } from '@angular/common/http';
import { AdminDataService } from '../admin-data.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  captchaText: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private myService: ApiCallsService,
    private http: HttpClient,
    private authService: AdminDataService
  ) {}

  storage = inject(StorageService);

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      captcha: ['', Validators.required]
    });

    this.generateCaptcha();
  }

  get formControl() {
    return this.loginForm.controls;
  }

  generateCaptcha() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    this.captchaText = Array.from({ length: 5 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    this.loginForm.get('captcha')?.setValue('');
  }

  onLogin() {
    const { username, password, captcha } = this.loginForm.value;

    if (!username || !password || !captcha) {
      alert("Username, password, and captcha are required!!");
      return;
    }

    if (captcha !== this.captchaText) {
      alert("CAPTCHA is incorrect!");
      return;
    }

    this.myService.loginEmployee({ username, password }).subscribe({
      next: (res: any) => {
        const response = JSON.parse(res);
        if (response?.token) {
          this.storage.saveDataToLocalStorage('token', response.token);
          this.authService.setUsername(response.username);
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        console.error("Login error: ", err);
        if (err.status === 403) {
          alert("Invalid username or password.");
        } else {
          alert("Something went wrong. Please try again later.");
        }
      }
    });
  }
}
