import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCallsService } from '../api-calls.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password-page',
  standalone: false,
  templateUrl: './forgot-password-page.component.html',
  styleUrl: './forgot-password-page.component.css'
})

export class ForgotPasswordPageComponent implements OnInit {
  token = '';
  valid = false;
  newPassword = '';
  message = '';
  
  employeeForm:any
  response: any

  constructor(private myService: ApiCallsService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.employeeForm = this.fb.group({
      password: ['', Validators.required]});

    this.token = this.route.snapshot.queryParamMap.get('token') || '';
    this.myService.validateToken(this.token).subscribe(v => this.valid = v);
    console.log('token', this.token)
  }

  reset() {
    if (this.valid) {
      this.myService.resetPassword(this.token, this.employeeForm.value['password']).subscribe((res) => {
        this.response=res;
        alert(this.response.message)
        this.router.navigate(['/login'])
      });
    }
  }
}
