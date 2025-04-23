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

  constructor(private myService: ApiCallsService, public dialog: MatDialog) {
    this.getAllEmployees();
  }
  ngOnInit(): void { }

  getAllEmployees() {
    this.myService.getAllEmployees(this.currentPage, this.pageSize, this.sortColumn , this.sortAsc ? 'asc' : 'desc').subscribe((res) => {
      console.log(res)
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
}
