import { Component, inject, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent  implements OnInit{
  storage = inject(StorageService);
  router = inject(Router);

  onLogOut(){
    this.storage.removetDataFromLocalStorage('token');
    this.router.navigate(['/login'])
  }

  ngOnInit(): void {
  }
}
