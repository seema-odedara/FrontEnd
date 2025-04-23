import { Component } from '@angular/core';
import { ApiCallsService } from '../api-calls.service';
import { ActivatedRoute } from '@angular/router';
import { AdminDataService } from '../admin-data.service';

@Component({
  selector: 'app-admin-data',
  standalone: false,
  templateUrl: './admin-data.component.html',
  styleUrl: './admin-data.component.css'
})
export class AdminDataComponent {

  username = "seema";
  adminData:any;

  constructor(private myService: ApiCallsService, private adminDataService: AdminDataService) {
    const username = this.adminDataService.getUsername();
    this.username = username;
    this.getAdminByUsername();
  }
  ngOnInit(): void {
   }

   getAdminByUsername() {
    this.myService.getAdminByUsername(this.username).subscribe((res) => {
      this.adminData = res;
    });
  }
}
