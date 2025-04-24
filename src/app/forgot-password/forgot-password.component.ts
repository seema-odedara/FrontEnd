import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../api-calls.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit {
  employeeForm: any
  response: any

  constructor(private myService: ApiCallsService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      email: ['', Validators.required]
    });
  }

  sendResetLink() {
    console.log("email", this.employeeForm)
    this.myService.forgotPassword(this.employeeForm.value['email']).subscribe((res) => {
      this.response = res;
      alert(this.response.message)
      this.router.navigate(['/login'])
    });
  }
}
