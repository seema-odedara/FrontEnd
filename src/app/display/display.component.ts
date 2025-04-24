import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../api-calls.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { UpdateComponent } from '../update/update.component';
import { ViewComponent } from '../view/view.component';

@Component({
  selector: 'app-display',
  standalone: false,
  templateUrl: './display.component.html',
  styleUrl: './display.component.css'
})
export class DisplayComponent implements OnInit {

  studentList: any = [{}];

  studentId: any;

  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;

  sortColumn: string = 'username';
  sortAsc: boolean = true;

  searchName: string = '';

  constructor(private myService: ApiCallsService, public dialog: MatDialog) {
    this.getAllEmployees();
  }
  ngOnInit(): void { }

  getAllEmployees() {
    this.myService.getAllEmployees(this.currentPage, this.pageSize, this.sortColumn, this.sortAsc ? 'asc' : 'desc').subscribe((res) => {
      this.studentList = res.content;
      this.currentPage = res.pageable.pageNumber + 1;
      this.totalPages = res.totalPages;
    });
  }

  delete(employeeId: number) {

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '300ms',
      data: { id: employeeId }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllEmployees();

    });

  }

  update(id: number) {

    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '500px',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '300ms',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.getAllEmployees();

    });

  }

  view(id: number) {

    const dialogRef = this.dialog.open(ViewComponent, {
      width: '500px',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '300ms',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.getAllEmployees();

    });

  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getAllEmployees();
    }
  }

  sortBy(column: string) {
    if (this.sortColumn === column) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortColumn = column;
      this.sortAsc = true;
    }
    this.getAllEmployees();
  }

  getInitials(fullName: string): string {
    if (!fullName) return '';
    const words = fullName.trim().split(' ');
    let initials = words[0]?.charAt(0).toUpperCase();
    if (words.length > 1) {
      initials += words[1]?.charAt(0).toUpperCase();
    }
    return initials;
  }

  search() {
    this.currentPage = 1;
    this.pageSize = 10; 
    this.totalPages = 0;

    this.myService.getAllEmployeesByName(this.searchName, this.currentPage, this.pageSize).subscribe((res) => {
      console.log(res.content)
      this.studentList = res.content;
      this.currentPage = res.pageable.pageNumber + 1;
      this.totalPages = res.totalPages;
    });
  }

  reset() {
    this.searchName = '';
    this.getAllEmployees();
  }

  get paginationPages(): (number | string)[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const pages: (number | string)[] = [];
  
    if (total <= 5) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1); // Always show first page
  
      if (current > 3) {
        pages.push('...');
      }
  
      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);
  
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
  
      if (current < total - 2) {
        pages.push('...');
      }
  
      pages.push(total); // Always show last page
    }
  
    return pages;
  }

  isNumber(value: any): value is number {
    return typeof value === 'number';
  }
  
}
